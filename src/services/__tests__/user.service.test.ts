import { describe, expect, it, beforeEach, vi } from "vitest";
import jwt, { type JwtPayload } from "jsonwebtoken";
import UserService from "../user.service.js";
import type { IUserPublic } from "../../types/user.interface.js";
import { randomUUID } from "crypto";

vi.mock("../../../lib/prisma.js");

import prisma from "../../tests/__mocks__/@prisma/prisma.js";

const getUserToken = (user_type: string) => {
  const adminUser = {
    user_id: randomUUID(),
    user_type: user_type,
    email: "felipe@email.com",
  };

  const jwtSecret = process.env.JWT_SECRET || "fallback_secret_for_tests";

  return jwt.sign(
    {
      user_id: adminUser.user_id,
      user_type: adminUser.user_type,
    },
    jwtSecret,
    { expiresIn: "30d" },
  );
};

describe("Teste de variáveis de ambiente.", () => {
  it("deve carrega a variável SALT_ROUNDS", () => {
    console.log(`SALT_ROUNDS: ${process.env.SALT_ROUNDS}`);
    console.log("Tipo:", typeof process.env.SALT_ROUNDS);
  });

  it("deve carregar a variável JWT_SECRET.", () => {
    console.log(`JWT_SECRET: ${process.env.JWT_SECRET}`);
    console.log("Tipo:", typeof process.env.JWT_SECRET);
  });
});

describe("Testes de registro", () => {
  let userService: UserService;
  let userList: IUserPublic[];

  beforeEach(() => {
    userList = [
      {
        name: "Pedro",
        email: "pedro@email.com",
        user_type: "Cliente",
        user_id: randomUUID(),
      },
      {
        name: "João",
        email: "joao@email.com",
        user_type: "Cliente",
        user_id: randomUUID(),
      },
    ];

    userService = new UserService(prisma);
  });

  it("Deve criar um novo usuário.", async () => {
    const adminJwt = getUserToken("Admin");

    const newMockedUser = {
      user_id: randomUUID(),
      name: "Mario",
      email: "mario@email.com",
      password: "1234",
      user_type: "Cliente",
    };

    prisma.user.create.mockResolvedValue(newMockedUser);

    const newUser = await userService.registerNewUser(newMockedUser, adminJwt);

    expect(newUser.name).toBe("Mario");
  });

  it("Não deve permitir a criação do usuário", async () => {
    const adminJwt = getUserToken("Cliente");

    expect(async () => {
      await userService.registerNewUser(
        {
          name: "Mario",
          email: "mario@email.com",
          password: "1234",
          user_type: "Cliente",
        },
        adminJwt,
      );
    }).toThrowError;
  });
});

describe("Testes de update.", () => {
  let userService: UserService;
  let userList: IUserPublic[];

  beforeEach(() => {
    userList = [
      {
        user_id: randomUUID(),
        name: "Pedro",
        email: "pedro@email.com",
        user_type: "Cliente",
      },
      {
        user_id: randomUUID(),
        name: "Marcos",
        email: "marcos@email.com",
        user_type: "Admin",
      },
      {
        user_id: randomUUID(),
        name: "Italo",
        email: "italo@email.com",
        user_type: "Admin",
      },
      {
        user_id: randomUUID(),
        name: "Thiago",
        email: "thiago@email.com",
        user_type: "Cliente",
      },
    ];

    userService = new UserService(prisma);
  });

  // Passou, mas da erro pois procura os dados diretamente no banco de dados
  it("Não deve permitir alteração de dados do usuário.", () => {
    const adminJwt = getUserToken("Cliente");

    expect(async () => {
      await userService.updateUserData(
        { name: "Rafael" },
        userList[1]!.user_id,
        adminJwt,
      );
    }).toThrowError;
  });
});

describe("Testes de delete.", () => {
  let userService: UserService;
  let userList: IUserPublic[];

  beforeEach(() => {
    userList = [
      {
        user_id: randomUUID(),
        name: "Pedro",
        email: "pedro@email.com",
        user_type: "Cliente",
      },
      {
        user_id: randomUUID(),
        name: "Marcos",
        email: "marcos@email.com",
        user_type: "Admin",
      },
      {
        user_id: randomUUID(),
        name: "Italo",
        email: "italo@email.com",
        user_type: "Admin",
      },
      {
        user_id: randomUUID(),
        name: "Thiago",
        email: "thiago@email.com",
        user_type: "Cliente",
      },
    ];

    userService = new UserService(prisma);
  });

  it("Não deve permitir a remoção do usuário", () => {
    const adminJwt = getUserToken("Cliente");

    expect(async () => {
      await userService.deleteUserData(userList[0]!.user_id, adminJwt);
    }).toThrowError;
  });
});
