// services/AuthService.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type {
  IUserPublic,
  IUserWithPassword,
} from "../types/user.interface.ts";
import type { PrismaClient } from "../../generated/prisma/client.ts";

class AuthService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async userLogin(
    email: string,
    password: string,
    user_type: string,
    req?: Request, // Adicionado para capturar device info (opcional)
  ): Promise<{ user: IUserPublic; accessToken: string; refreshToken: string }> {
    const userTryingToLogin = await this.checkIfUserExists(email, user_type);

    if (!(await this.isPasswordMatch(password, userTryingToLogin.password))) {
      throw new Error("Credenciais inválidas.");
    }

    const { password: _, ...userPublic } = userTryingToLogin;

    // Gera ACCESS token (curta duração)
    const accessToken = await this.generateAccessToken(
      userTryingToLogin.user_id,
      userTryingToLogin.user_type,
    );

    // Gera REFRESH token (longa duração) e salva no banco
    const refreshToken = await this.saveRefreshToken(
      userTryingToLogin.user_id,
      userTryingToLogin.user_type,
    );

    return {
      user: userPublic,
      accessToken,
      refreshToken,
    };
  }

  async generateAccessToken(
    user_id: string,
    user_type: string,
  ): Promise<string> {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET não definida.");

    return jwt.sign({ user_id, user_type }, secret, { expiresIn: "10s" });
  }

  async generateRefreshToken(
    user_id: string,
    user_type: string,
  ): Promise<string> {
    const secret = process.env.REFRESH_SECRET;
    if (!secret) throw new Error("REFRESH_SECRET não definida.");

    return jwt.sign({ user_id, user_type }, secret, { expiresIn: "7d" });
  }

  async saveRefreshToken(user_id: string, user_type: string): Promise<string> {
    const refreshToken = await this.generateRefreshToken(user_id, user_type);

    // Calcula data de expiração (7 dias a partir de agora)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Salva no banco
    await this.prisma.refresh_tokens.create({
      data: {
        user_uuid: user_id,
        token: refreshToken,
        expires_at: expiresAt,
        revoked: false,
      },
    });

    return refreshToken;
  }

  // ==================== REFRESH ====================
  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ accessToken: string }> {
    return await this.prisma.$transaction(async (prisma) => {
      // Verifica JWT primeiro
      let decoded: { user_id: string };
      try {
        const secret = process.env.REFRESH_SECRET;
        if (!secret) throw new Error("REFRESH_SECRET não definida.");

        decoded = jwt.verify(refreshToken, secret) as { user_id: string };
      } catch (jwtError) {
        // JWT inválido - revoga no banco se existir
        await prisma.refresh_tokens.updateMany({
          where: { token: refreshToken },
          data: { revoked: true },
        });
        throw new Error("Refresh token inválido.");
      }

      // Verifica no banco (com lock para evitar condições de corrida)
      const tokenRecord = await prisma.refresh_tokens.findUnique({
        where: { token: refreshToken },
      });

      if (
        !tokenRecord ||
        tokenRecord.revoked ||
        tokenRecord.expires_at < new Date()
      ) {
        throw new Error("Refresh token revogado ou expirado.");
      }

      // Busca usuário
      const user = await prisma.users.findUnique({
        where: { user_id: decoded.user_id },
        select: { user_id: true, user_type: true },
      });

      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      // Gera novo access token
      const newAccessToken = jwt.sign(
        { user_id: user.user_id, user_type: user.user_type },
        process.env.JWT_SECRET!,
        { expiresIn: "15m" },
      );

      return { accessToken: newAccessToken };
    });
  }

  async revokeRefreshToken(refreshToken: string): Promise<void> {
    await this.prisma.refresh_tokens.update({
      where: { token: refreshToken },
      data: { revoked: true },
    });
  }

  async revokeAllUserRefreshTokens(user_id: string): Promise<void> {
    await this.prisma.refresh_tokens.updateMany({
      where: {
        user_uuid: user_id,
        revoked: false,
      },
      data: { revoked: true },
    });
  }

  private async checkIfUserExists(
    email: string,
    user_type: string,
  ): Promise<IUserWithPassword> {
    const user = await this.prisma.users.findFirst({
      where: { email, user_type },
      select: {
        user_id: true,
        name: true,
        email: true,
        user_type: true,
        password: true,
      },
    });

    if (!user) throw new Error("Credenciais inválidas.");
    return user;
  }

  private async isPasswordMatch(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export default AuthService;
