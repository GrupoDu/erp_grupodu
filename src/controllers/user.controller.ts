import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import type { IUser } from "../types/models.interface.js";
import bcrypt from "bcrypt";
import { responseMessages } from "../constants/messages.constants.js";

class UserController {
  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const allUsers: IUser[] = await prisma.user.findMany();

      return res.status(200).json(allUsers);
    } catch (err) {
      return res.status(500).json({
        message: responseMessages.catchErrorMessage,
        error: (err as Error).message,
      });
    }
  }

  async createNewUser(req: Request, res: Response): Promise<Response> {
    const saltRounds = 10;

    try {
      const newUserInfos = req.body;

      if (
        !newUserInfos.name ||
        !newUserInfos.email ||
        !newUserInfos.password ||
        !newUserInfos.user_type
      ) {
        return res
          .status(422)
          .json({ message: responseMessages.fillAllFieldMessage });
      }

      const hashPassword = await bcrypt.hash(newUserInfos.password, saltRounds);

      const newUser: IUser = await prisma.user.create({
        data: {
          name: newUserInfos.name,
          email: newUserInfos.email,
          password: hashPassword,
          user_type: newUserInfos.user_type,
        },
      });

      return res
        .status(201)
        .json({ message: "Novo usuário criado com sucesso.", user: newUser });
    } catch (err) {
      return res
        .status(500)
        .json({
          message: responseMessages.catchErrorMessage,
          error: (err as Error).message,
        });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { uuid } = req.params;

      if (!uuid)
        return res.status(422).json({
          message:
            "Por favor, passe o parametro 'uuid' para deletar o usuário.",
        });

      const userToBeDeleted = {
        where: {
          user_id: uuid as string,
        },
      };

      await prisma.user.delete(userToBeDeleted);

      return res.status(200).json({ message: "Usuário deletado com sucesso." });
    } catch (err) {
      return res
        .status(500)
        .json({ message: responseMessages.catchErrorMessage });
    }
  }

  async updateUserData(req: Request, res: Response): Promise<Response> {
    try {
      const { updateInfos } = req.body;
      const { uuid } = req.params;

      const userToBeUpdated = {
        data: updateInfos,
        where: {
          user_id: uuid as string,
        },
      };

      const updatedUser = await prisma.user.update(userToBeUpdated);

      return res.status(200).json({
        message: "Usuário editado com successo.",
        update: updatedUser,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: responseMessages.catchErrorMessage });
    }
  }
}

export default UserController;
