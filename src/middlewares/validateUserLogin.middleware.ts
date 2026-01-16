import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma.js";
import type { IUser } from "../types/models.interface.js";
import { responseMessages } from "../constants/messages.constants.js";
import {
  hasValidPassword,
  successfulValidation,
  type IUserValidation,
} from "../types/userValidation.interface.js";

// interface ILoginValues {
//   email?: string;
//   password?: string;
//   loginValuesVerified: boolean;
//   err: {
//     message: string;
//     statusCode: number;
//   };
// }

export async function validateUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.body;

    const validatedUser: IUserValidation = await checkIfUserExists(email);

    if (!successfulValidation(validatedUser)) {
      res
        .status(validatedUser.error?.statusCode || 401)
        .json({ message: validatedUser.error?.message });
      return;
    }

    const validatedPassword: IUserValidation = await checkIfPasswordMatch(
      password,
      validatedUser.user
    );

    if (!hasValidPassword(validatedPassword)) {
      res
        .status(validatedPassword.error?.statusCode || 401)
        .json({ message: validatedPassword.error?.message });
      return;
    }

    req.authenticatedUser = validatedPassword.user;
    next();
    return;
  } catch (err) {
    res.status(500).json({
      message: "Erro interno do servidor.",
      error: (err as Error).message,
    });
    return;
  }
}

async function checkIfPasswordMatch(
  password: string,
  userInfos: IUser
): Promise<IUserValidation> {
  const userPassword = userInfos.password;

  const userPasswordDecode = await bcrypt.compare(password, userPassword);

  if (!userPasswordDecode) {
    return {
      success: false,
      error: {
        message: "Usuário ou senha incorretos.",
        statusCode: 401,
      },
    };
  }

  return {
    success: true,
    user: userInfos,
  };
}

async function checkIfUserExists(email: string): Promise<IUserValidation> {
  const userTryingToLogin = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!userTryingToLogin) {
    return {
      success: false,
      error: {
        message: "Usuário ou senha incorretos.",
        statusCode: 401,
      },
    };
  }

  return {
    success: true,
    user: userTryingToLogin,
  };
}

export default validateUserMiddleware;
