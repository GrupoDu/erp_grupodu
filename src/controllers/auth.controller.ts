import type { CookieOptions, Request, Response } from "express";
import type AuthService from "../services/auth.service.ts";
import { responseMessages } from "../constants/messages.constants.ts";
import jwt from "jsonwebtoken";

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  // ==================== LOGIN (MODIFICADO) ====================
  async userLogin(req: Request, res: Response) {
    try {
      const { email, password, user_type } = req.body;

      if (!email || !password || !user_type) {
        return res
          .status(400)
          .json({ message: responseMessages.fillAllFieldMessage });
      }

      // Chama o service passando o req para capturar device info (opcional)
      const { user, accessToken, refreshToken } =
        await this.authService.userLogin(email, password, user_type);

      // Configuração dos cookies
      const isProduction = process.env.NODE_ENV === "production";
      const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "strict" : "none",
        path: "/",
      };

      const ACCESS_MIN = 15;
      const ACCESS_SEC = 60;
      const ACCESS_MS = 1000;

      const REFRESH_DAYS = 7;
      const REFRESH_HOURS = 24;
      const REFRESH_MIN = 60;
      const REFRESH_SEC = 60;
      const REFRESH_MS = REFRESH_MIN * REFRESH_SEC * 1000;

      // Access token: dura 15 minutos (mesmo tempo do JWT)
      const accessTokenMaxAge = ACCESS_MIN * ACCESS_SEC * ACCESS_MS; // 15 minutos em ms
      // Refresh token: dura 7 dias
      const refreshTokenMaxAge = REFRESH_DAYS * REFRESH_HOURS * REFRESH_MS; // 7 dias em ms

      res
        .status(200)
        .cookie("access_token", accessToken, {
          ...cookieOptions,
          maxAge: accessTokenMaxAge,
        })
        .cookie("refresh_token", refreshToken, {
          ...cookieOptions,
          maxAge: refreshTokenMaxAge,
          path: "/",
        }) // restrito à rota de refresh
        .json({
          message: "Usuário logado com sucesso.",
          user,
        });
    } catch (err) {
      return res.status(500).json({
        message: responseMessages.catchErrorMessage,
        error: (err as Error).message,
      });
    }
  }

  // ==================== REFRESH ====================
  async refresh(req: Request, res: Response) {
    try {
      // Pega o refresh token do cookie (enviado automaticamente)
      const refreshToken = req.cookies.refresh_token;
      if (!refreshToken) {
        return res
          .status(401)
          .json({ message: "Refresh token não fornecido." });
      }

      const tokens = await this.authService.refreshAccessToken(refreshToken);

      // Atualiza os cookies
      const isProduction = process.env.NODE_ENV === "production";
      const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "strict" : "lax",
        path: "/",
      };
      const accessTokenMaxAge = 15 * 60 * 1000; // 15 minutos

      res.cookie("access_token", tokens.accessToken, {
        ...cookieOptions,
        maxAge: accessTokenMaxAge,
      });

      // Se houve rotação, atualiza também o refresh token
      if (tokens.refreshToken) {
        const refreshTokenMaxAge = 7 * 24 * 60 * 60 * 1000;
        res.cookie("refresh_token", tokens.refreshToken, {
          ...cookieOptions,
          maxAge: refreshTokenMaxAge,
          path: "/",
        });
      }

      return res.status(200).json({ message: "Token renovado com sucesso." });
    } catch (err) {
      // Em caso de erro, limpa os cookies por segurança
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      return res.status(401).json({
        message: "Falha ao renovar token.",
        error: (err as Error).message,
      });
    }
  }

  // ==================== LOGOUT (APRIMORADO) ====================
  async userLogout(req: Request, res: Response): Promise<Response> {
    try {
      const refreshToken = req.cookies.refresh_token;
      if (refreshToken) {
        await this.authService.revokeRefreshToken(refreshToken);
      }

      const isProduction = process.env.NODE_ENV === "production";
      res
        .clearCookie("access_token", {
          httpOnly: true,
          secure: isProduction,
          sameSite: "strict",
          path: "/",
        })
        .clearCookie("refresh_token", {
          httpOnly: true,
          secure: isProduction,
          sameSite: "strict",
          path: "/",
        });

      return res.json({ message: "Usuário deslogado com sucesso." });
    } catch (err) {
      return res.status(500).json({
        message: "Erro ao fazer logout.",
        error: (err as Error).message,
      });
    }
  }

  // ==================== LOGOUT DE TODOS OS DISPOSITIVOS ====================
  async logoutAll(req: Request, res: Response) {
    try {
      // Presume que o usuário já está autenticado (middleware)
      const userId = (req as any).user.user_id; // Ajuste conforme seu middleware
      await this.authService.revokeAllUserRefreshTokens(userId);

      // Limpa os cookies atuais
      const isProduction = process.env.NODE_ENV === "production";
      res
        .clearCookie("access_token", {
          httpOnly: true,
          secure: isProduction,
          sameSite: "strict",
          path: "/",
        })
        .clearCookie("refresh_token", {
          httpOnly: true,
          secure: isProduction,
          sameSite: "strict",
          path: "/",
        });

      return res.json({ message: "Todos os dispositivos desconectados." });
    } catch (err) {
      return res.status(500).json({
        message: "Erro ao desconectar dispositivos.",
        error: (err as Error).message,
      });
    }
  }

  // ==================== MÉTODO EXISTENTE (AJUSTADO) ====================
  isTokenStillValid(req: Request, res: Response) {
    // Agora verifica o access_token
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: "Token inválido." });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
      return res.status(200).json({ status: "ok" });
    } catch {
      return res.status(401).json({ message: "Token expirado ou inválido." });
    }
  }
}

export default AuthController;
