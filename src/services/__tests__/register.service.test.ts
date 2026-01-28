import { describe, it, beforeEach, expect, vi } from "vitest";
import RegisterService from "../register.service.js";
import type { IRegister } from "../../types/register.interface.js";
import { Prisma } from "@prisma/client";

vi.mock("../../../lib/prisma.js");

import prisma from "../../tests/__mocks__/@prisma/prisma.js";
import { randomUUID } from "node:crypto";

describe("Testes de criação de registro.", () => {
  let registerService: RegisterService;

  beforeEach(() => {
    vi.clearAllMocks();
    registerService = new RegisterService(prisma);
  });

  it("Deve conseguir criar um novo registro.", async () => {
    const newMockedRegister = {
      register_id: randomUUID(),
      created_at: new Date(),
      title: "Título do registro",
      deadline: new Date(2025, 3, 5),
      description:
        "Descrição do registro com observações e detalhes importantes",
      status: "Pendente",
      client_uuid: "03899d9f-0c34-4458-8883-1e8523bc14b5",
      product_quantity: new Prisma.Decimal("100.00"),
      product_uuid: "a25a26f7-0e2c-48e9-a7e2-b92772784f87",
      employee_uuid: null,
      cut_assistant: null,
      deliver_observation: null,
      delivered_at: null,
      finishing_assistant: null,
      fold_assistant: null,
      paint_assistant: null,
    };

    prisma.register.create.mockResolvedValue(newMockedRegister);

    const newRegister =
      await registerService.createNewRegister(newMockedRegister);

    expect(newRegister.title).toBe("Título do registro");
  });
});
