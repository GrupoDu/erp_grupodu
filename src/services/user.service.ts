import { PrismaClient } from "../../generated/prisma/client.js";
import bcrypt from "bcrypt";
import type {
  IUserCreate,
  IUserPublic,
  IUserUpdate,
} from "../types/user.interface.js";
import removeUndefinedUpdateFields from "../utils/removeUndefinedUpdateFields.utils.js";
import { isEmailFormatValid } from "../utils/emailFormatValidator.util.js";

/**
 * Service responsável por gerenciar usuários.
 *
 * @class UserService
 * @see UserController
 */
class UserService {
  private _prisma: PrismaClient;

  /** @param {PrismaClient} prisma - Instância do PrismaClient */
  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  /**
   * Busca todos os usuários (exceto Admin).
   *
   * @returns {Promise<IUserPublic[]>} - Array de usuários públicos
   * @see {IUserPublic}
   */
  async getAllUsersData(): Promise<IUserPublic[]> {
    return this._prisma.users.findMany({
      select: {
        email: true,
        name: true,
        user_uuid: true,
        user_role: true,
      },
      orderBy: { name: "asc" },
      where: {
        name: {
          not: "Admin",
        },
      },
    });
  }

  /**
   * Busca todos os usuários do tipo supervisor.
   *
   * @returns {Promise<IUserPublic[]>} - Array de supervisores
   * @see {IUserPublic}
   */
  async getAllSupervisorsUsers(): Promise<IUserPublic[]> {
    return this._prisma.users.findMany({
      where: {
        user_role: "supervisor",
      },
      select: {
        email: true,
        name: true,
        user_uuid: true,
        user_role: true,
      },
      orderBy: { name: "asc" },
    });
  }

  /**
   * Busca um usuário pelo ID.
   *
   * @param {string} user_uuid - ID do usuário
   * @returns {Promise<IUserPublic>} - Dados públicos do usuário
   * @throws {Error} - ID do usuário não fornecido ou usuário não encontrado
   * @see {IUserPublic}
   */
  async getUserById(user_uuid: string): Promise<IUserPublic> {
    const userData = await this._prisma.users.findUnique({
      where: {
        user_uuid,
      },
      select: {
        email: true,
        name: true,
        user_uuid: true,
        user_role: true,
      },
    });

    if (!userData) throw new Error("Usuário não encontrado.");

    return userData;
  }

  /**
   * Registra um novo usuário.
   *
   * @param {IUserCreate} userInfos - Dados do novo usuário
   * @returns {Promise<IUserPublic>} - Usuário criado
   * @throws {Error} - Variável de ambiente SALT_ROUNDS não encontrada
   * @see {IUserCreate}
   * @see {IUserPublic}
   */
  async registerNewUser(userInfos: IUserCreate): Promise<IUserPublic> {
    const saltRounds = process.env.SALT_ROUNDS;

    if (!saltRounds)
      throw new Error("Variável de ambiente SALT_ROUNDS não encontrada.");

    isEmailFormatValid(userInfos.email);

    const saltRoundsNumber = parseInt(saltRounds, 10);

    const hashPassword = await bcrypt.hash(
      userInfos.password,
      saltRoundsNumber,
    );

    return this._prisma.users.create({
      data: {
        name: userInfos.name,
        email: userInfos.email,
        password: hashPassword,
        user_role: userInfos.user_role,
      },
    });
  }

  /**
   * Atualiza dados de um usuário.
   *
   * @param {IUserUpdate} userNewData - Novos dados do usuário
   * @param {string} userUuid - ID do usuário
   * @returns {Promise<IUserPublic>} - Usuário atualizado
   * @throws {Error} - Nenhum campo fornecido
   * @see {IUserUpdate}
   * @see {IUserPublic}
   */
  async updateUserData(
    userNewData: IUserUpdate,
    userUuid: string,
  ): Promise<IUserPublic> {
    const updateFields = removeUndefinedUpdateFields(userNewData);
    const hasNoFieldsToUpdate = Object.keys(updateFields).length < 1;

    if (hasNoFieldsToUpdate) throw new Error("Nenhum campo fornecido");

    return this._prisma.users.update({
      where: {
        user_uuid: userUuid,
      },
      data: {
        email: String(updateFields.email),
        name: String(updateFields.name),
        user_role: String(updateFields.user_role),
      },
    });
  }

  /**
   * Remove um usuário do sistema.
   *
   * @param {string} user_uuid - ID do usuário
   * @returns {Promise<string>} - Mensagem de sucesso
   * @throws {Error} - ID do usuário não fornecido ou usuário não encontrado
   */
  async deactivateUser(user_uuid: string): Promise<string> {
    const deletedUser = await this._prisma.users.update({
      where: {
        user_uuid,
      },
      data: {
        is_active: false,
      }
    });

    if (!deletedUser) throw new Error("Usuário não encontrado.");

    return "Usuário desativado com sucesso";
  }
}

export default UserService;
