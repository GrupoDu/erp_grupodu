import type { Request, Response } from "express";
import type UserService from "../services/user.service.js";
import dotenv from "dotenv";
import errorResponseWith from "../utils/errorResponseWith.js";
import successResponseWith from "../utils/successResponseWith.js";
import {
  REQUIRED_FIELDS_MESSAGE,
  MISSING_FIELDS_MESSAGE,
} from "../constants/messages.constants.js";
import { hasValidString } from "../utils/hasValidString.js";
import type { IUserCreate, IUserUpdate } from "../types/user.interface.js";
import checkMissingFields from "../utils/checkMissingFields.js";
import { UserCreateSchema, UserUpdateSchema } from "../schemas/user.schema.js";

dotenv.config();

/**
 * Controller responsável por gerenciar as operações relacionadas ao usuário.
 * @see UserService
 * @method getAllUsers
 * @method getUserById
 * @method getAllSupervisorsUser
 * @method createNewUser
 * @method deleteUser
 * @method updateUserData
 */
class UserController {
  private _userService: UserService;

  constructor(userService: UserService) {
    this._userService = userService;
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const allUsers = await this._userService.getAllUsersData();

      return res
        .status(200)
        .json(
          successResponseWith(allUsers, "Usuários encontrados com sucesso."),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const { user_uuid } = req.params;

      if (!hasValidString(user_uuid)) {
        return res
          .status(422)
          .json(
            errorResponseWith(
              REQUIRED_FIELDS_MESSAGE(["user_uuid"]),
              422,
              MISSING_FIELDS_MESSAGE,
            ),
          );
      }

      const userData = await this._userService.getUserById(user_uuid);

      return res
        .status(200)
        .json(successResponseWith(userData, "Usuário encontrado com sucesso."));
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  async getAllSupervisorsUser(req: Request, res: Response): Promise<Response> {
    try {
      const allSupervisors = await this._userService.getAllSupervisorsUsers();

      return res
        .status(200)
        .json(
          successResponseWith(
            allSupervisors,
            "Supervisores encontrados com sucesso.",
          ),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  async createNewUser(req: Request, res: Response): Promise<Response> {
    const newUserInfos = req.body as IUserCreate;

    try {
      const { isMissingFields, requiredFieldsMessage, schemaErr } =
        checkMissingFields(newUserInfos, UserCreateSchema);

      if (isMissingFields) {
        return res
          .status(422)
          .json(errorResponseWith(schemaErr, 422, requiredFieldsMessage));
      }

      const newUser = await this._userService.registerNewUser(newUserInfos);

      return res
        .status(201)
        .json(
          successResponseWith(newUser, "Novo usuário criado com sucesso.", 201),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { user_uuid } = req.params;

      if (!hasValidString(user_uuid)) {
        return res
          .status(422)
          .json(
            errorResponseWith(
              REQUIRED_FIELDS_MESSAGE(["user_uuid"]),
              422,
              MISSING_FIELDS_MESSAGE,
            ),
          );
      }

      await this._userService.deleteUserData(user_uuid);

      return res
        .status(200)
        .json(successResponseWith(null, "Usuário deletado com sucesso."));
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  async updateUserData(req: Request, res: Response): Promise<Response> {
    const updateInfos = req.body as IUserUpdate;
    const { user_uuid } = req.params;

    try {
      const { isMissingFields, requiredFieldsMessage, schemaErr } =
        checkMissingFields(updateInfos, UserUpdateSchema);

      if (!hasValidString(user_uuid)) {
        return res
          .status(422)
          .json(
            errorResponseWith(
              REQUIRED_FIELDS_MESSAGE(["user_uuid"]),
              422,
              MISSING_FIELDS_MESSAGE,
            ),
          );
      }

      if (isMissingFields) {
        return res
          .status(422)
          .json(errorResponseWith(schemaErr, 422, requiredFieldsMessage));
      }

      const updatedUser = await this._userService.updateUserData(
        updateInfos,
        user_uuid,
      );

      return res
        .status(200)
        .json(successResponseWith(updatedUser, "Usuário editado com sucesso."));
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  tokenValidator(req: Request, res: Response): Response {
    try {
      const token = req.tokenResponse?.payload;

      if (!token?.isValid) {
        return res.status(401).json(errorResponseWith("Token expirado.", 401));
      }

      if (token?.payload) {
        return res
          .status(200)
          .json(successResponseWith(token.payload, "Token válido."));
      }

      return res.status(401).json(errorResponseWith("Token inválido.", 401));
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }
}

export default UserController;
