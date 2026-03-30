import type { CookieOptions, Request, Response } from "express";
import type AuthService from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import errorResponseWith from "../utils/errorResponseWith.js";
import successResponseWith from "../utils/successResponseWith.js";
import type { IUserLogin } from "../types/auth.interface.js";
import checkMissingFields from "../utils/checkMissingFields.js";
import { UserLoginSchema } from "../schemas/auth.schema.js";
import debbugLogger from "../utils/debugLogger.js";

dotenv.config();

/**
 * Controller responsável por autenticação e autorização.
 * @see AuthService
 * @method userLogin
 * @method refresh
 * @method userLogout
 */
class AuthController {
  private _authService: AuthService;
  private static ACCESS_TOKEN_EXPIRY_MIN = 120;
  private static ACCESS_TOKEN_EXPIRY_MS =
    AuthController.ACCESS_TOKEN_EXPIRY_MIN * 60 * 1000;
  private static REFRESH_TOKEN_EXPIRY_DAYS = 7;
  private static REFRESH_TOKEN_EXPIRY_MS =
    AuthController.REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

  constructor(authService: AuthService) {
    this._authService = authService;
  }

  private getCookieOptions(): CookieOptions {
    const isProduction = process.env.NODE_ENV === "production";
    return {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    };
  }

  async userLogin(req: Request, res: Response) {
    const { email, password, user_type } = req.body as IUserLogin;

    try {
      const loginValues = { email, password, user_type };
      const { schemaErr, isMissingFields, requiredFieldsMessage } =
        checkMissingFields(loginValues, UserLoginSchema);

      if (isMissingFields) {
        return res
          .status(422)
          .json(errorResponseWith(schemaErr, 422, requiredFieldsMessage));
      }

      const { user, accessToken, refreshToken } =
        await this._authService.userLogin(email, password, user_type);

      const cookieOptions = this.getCookieOptions();

      res
        .status(200)
        .cookie("access_token", accessToken, {
          ...cookieOptions,
          maxAge: AuthController.ACCESS_TOKEN_EXPIRY_MS,
        })
        .cookie("refresh_token", refreshToken, {
          ...cookieOptions,
          maxAge: AuthController.REFRESH_TOKEN_EXPIRY_MS,
        })
        .json(successResponseWith({ user }, "Usuário logado com sucesso."));
    } catch (err) {
      const error = err as Error;
      const isInvalidCredentials = error.message === "Credenciais inválidas.";

      if (isInvalidCredentials) {
        return res.status(401).json(errorResponseWith(error.message, 401));
      }

      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = String(req.cookies.refresh_token);

    try {
      if (!refreshToken) {
        return res
          .status(401)
          .json(errorResponseWith("Refresh token não fornecido.", 401));
      }

      // O service agora retorna AMBOS os tokens (rotação)
      const { accessToken, refreshToken: newRefreshToken } =
        await this._authService.refreshAccessToken(refreshToken);

      const cookieOptions = this.getCookieOptions();

      res
        .cookie("access_token", accessToken, {
          ...cookieOptions,
          maxAge: AuthController.ACCESS_TOKEN_EXPIRY_MS,
        })
        .cookie("refresh_token", newRefreshToken, {
          ...cookieOptions,
          maxAge: AuthController.REFRESH_TOKEN_EXPIRY_MS,
        });

      return res
        .status(200)
        .json(successResponseWith(null, "Token renovado com sucesso."));
    } catch (err) {
      // Em caso de erro, limpa os cookies por segurança
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");

      return res
        .status(401)
        .json(
          errorResponseWith(
            "Falha ao renovar token.",
            401,
            (err as Error).message,
          ),
        );
    }
  }

  async userLogout(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.tokenResponse;
      debbugLogger([`token usado no logout: ${JSON.stringify(token)}`]);

      const isRefreshToken = token?.token_type === "refresh";
      if (isRefreshToken) {
        await this._authService.revokeRefreshToken(token.token);
      }

      const cookieOptions = this.getCookieOptions();

      res
        .clearCookie("access_token", cookieOptions)
        .clearCookie("refresh_token", cookieOptions);

      return res
        .status(200)
        .json(successResponseWith(null, "Usuário deslogado com sucesso."));
    } catch (err) {
      const error = err as Error;
      return res
        .status(500)
        .json(errorResponseWith("Erro ao fazer logout.", 500, error.message));
    }
  }

  isTokenStillValid(req: Request, res: Response) {
    const token = req.tokenResponse?.token;

    if (!token) {
      return res.status(401).json(errorResponseWith("Token inválido.", 401));
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET as string);

      return res
        .status(200)
        .json(successResponseWith({ payload }, "Token válido."));
    } catch {
      return res
        .status(401)
        .json(errorResponseWith("Token expirado ou inválido.", 401));
    }
  }
}

export default AuthController;
