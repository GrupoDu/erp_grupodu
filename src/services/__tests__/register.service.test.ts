import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import RegisterService from "../register.service.js";
import { mockedRegisterFactory } from "../../tests/factories/register.factory.js";
import jwt from "jsonwebtoken";

vi.mock("../../../lib/prisma.js");

import prisma from "../../tests/__mocks__/@prisma/prisma.js";

describe("Testes de criação de registro.", () => {
  let registerService: RegisterService;

  beforeEach(() => {
    vi.clearAllMocks();

    registerService = new RegisterService(prisma);
  });

  it("Deve conseguir criar um novo registro.", async () => {
    const mockedRegister = mockedRegisterFactory();

    prisma.register.create.mockResolvedValue(mockedRegister);

    const newRegister = await registerService.createNewRegister(mockedRegister);

    expect(newRegister.title).toBe("Título do registro");
  });
});

describe("Testes de update de registro.", () => {
  let registerService: RegisterService;
  let jwtVerifySpy: any;

  beforeEach(() => {
    vi.clearAllMocks();

    jwtVerifySpy = vi.spyOn(jwt, "verify");

    jwtVerifySpy.mockReturnValue({
      user_id: "123",
      user_type: "admin",
    });
    registerService = new RegisterService(prisma);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Deve editar título do registro.", async ({ skip }) => {
    const mockedTitleUpdateRegister = mockedRegisterFactory({
      title: "Update de título",
    });

    prisma.register.update.mockResolvedValue(mockedTitleUpdateRegister);

    const updateRegister = await registerService.updateRegisterData(
      mockedTitleUpdateRegister,
      "550e8400-e29b-41d4-a716-446655440000",
      jwtVerifySpy,
    );

    expect(updateRegister.title).toBe("Update de título");
    expect(updateRegister.register_id).toBe(
      "550e8400-e29b-41d4-a716-446655440000",
    );
  });

  it("Deve editar descrição do registro.", async ({ skip }) => {
    const mockedDescriptionUpdateRegister = mockedRegisterFactory({
      description: "Atualizando a descrição desse registro.",
    });

    prisma.register.update.mockResolvedValue(mockedDescriptionUpdateRegister);

    const updateRegister = await registerService.updateRegisterData(
      mockedDescriptionUpdateRegister,
      "550e8400-e29b-41d4-a716-446655440000",
      jwtVerifySpy,
    );

    expect(updateRegister.description).toBe(
      "Atualizando a descrição desse registro.",
    );
    expect(updateRegister.register_id).toBe(
      "550e8400-e29b-41d4-a716-446655440000",
    );
  });

  it("Deve editar ajudante de corte.", async ({ skip }) => {
    const mockedCutAssistantUpdateRegister = mockedRegisterFactory({
      cut_assistant: "Sergio",
    });

    prisma.register.update.mockResolvedValue(mockedCutAssistantUpdateRegister);

    const updateRegister = await registerService.updateRegisterData(
      mockedCutAssistantUpdateRegister,
      "550e8400-e29b-41d4-a716-446655440000",
      jwtVerifySpy,
    );

    expect(updateRegister.cut_assistant).toBe("Sergio");
  });

  it("Não deve permitir edição de registro.", () => {
    const mockedTitleUpdateRegister = mockedRegisterFactory({
      title: "Atualização de título",
    });

    jwtVerifySpy.mockImplementation(() => {
      throw new Error("Token invalido");
    });

    prisma.register.update.mockResolvedValue(mockedTitleUpdateRegister);

    expect(
      async () =>
        await registerService.updateRegisterData(
          mockedTitleUpdateRegister,
          "550e8400-e29b-41d4-a716-446655440000",
          jwtVerifySpy,
        ),
    ).toThrowError;
  });
});
