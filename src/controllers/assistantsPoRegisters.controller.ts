import type AssistantsPoRegistersService from "../services/assistantsPoRegisters.service.js";
import type { Request, Response } from "express";
import errorResponseWith from "../utils/errorResponseWith.js";
import successResponseWith from "../utils/successResponseWith.js";
import {
  REQUIRED_FIELDS_MESSAGE,
  MISSING_FIELDS_MESSAGE,
} from "../constants/messages.constants.js";
import type {
  IAssistantPORegisterIdentifiers,
  IAssistantsPORegisterCreate,
} from "../types/assistantsPoRegisters.interface.js";
import checkMissingFields from "../utils/checkMissingFields.js";
import AssistantPORegisterIdentifiers, {
  AssistantsPORegisterCreateSchema,
} from "../schemas/AssistantsPORegisters.schema.js";
import { hasValidString } from "../utils/hasValidString.js";

/**
 * Controller responsável por registrar atividade dos assistentes
 * @see AssistantsPoRegistersService
 * @method getAllAssistantsPORegisters
 * @method getAssistantsPORegistersByProductionOrderId
 * @method createAssistantPORegister
 * @method updateAssistantPORegisterAsDelivered
 */
export default class AssistantsPORegistersController {
  private _assistantsPoRegistersService: AssistantsPoRegistersService;

  constructor(assistantsPoRegistersService: AssistantsPoRegistersService) {
    this._assistantsPoRegistersService = assistantsPoRegistersService;
  }

  async getAllAssistantsPORegisters(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const allAssistantsPORegisters =
        await this._assistantsPoRegistersService.getAllAssistantsPORegisters();

      return res
        .status(200)
        .json(
          successResponseWith(
            allAssistantsPORegisters,
            "Dados encontrados com sucesso.",
          ),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  async getAssistantsPORegistersByProductionOrderId(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { production_order_uuid } = req.params;

    try {
      if (!hasValidString(production_order_uuid)) {
        return res
          .status(422)
          .json(
            errorResponseWith(
              REQUIRED_FIELDS_MESSAGE(["production_order_uuid"]),
              422,
              MISSING_FIELDS_MESSAGE,
            ),
          );
      }

      const assistantsPORegistersByProductionOrderId =
        await this._assistantsPoRegistersService.getAssistantsPORegistersByProductionOrderId(
          production_order_uuid,
        );
      return res
        .status(200)
        .json(
          successResponseWith(
            assistantsPORegistersByProductionOrderId,
            "Registros encontrados com sucesso.",
          ),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  async createAssistantPORegister(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const newAssistantPORegisterValues =
      req.body as IAssistantsPORegisterCreate;
    const { isMissingFields, requiredFieldsMessage, schemaErr } =
      checkMissingFields(
        newAssistantPORegisterValues,
        AssistantsPORegisterCreateSchema,
      );

    try {
      if (isMissingFields) {
        return res
          .status(422)
          .json(errorResponseWith(schemaErr, 422, requiredFieldsMessage));
      }

      const newAssistantPORegister =
        await this._assistantsPoRegistersService.createAssistantPORegister(
          newAssistantPORegisterValues,
        );

      return res
        .status(201)
        .json(
          successResponseWith(
            newAssistantPORegister,
            "Registro de assistente criado com sucesso.",
            201,
          ),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  async updateAssistantPORegisterAsDelivered(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const identifierValues = req.body as IAssistantPORegisterIdentifiers;
    const { isMissingFields, requiredFieldsMessage, schemaErr } =
      checkMissingFields(identifierValues, AssistantPORegisterIdentifiers);

    try {
      if (isMissingFields) {
        return res
          .status(422)
          .json(errorResponseWith(schemaErr, 422, requiredFieldsMessage));
      }

      const assistantPORegisterUpdateResponse =
        await this._assistantsPoRegistersService.updateAssistantPORegisterAsDelivered(
          identifierValues,
        );

      return res
        .status(200)
        .json(
          successResponseWith(
            assistantPORegisterUpdateResponse,
            "Registro atualizado como entregue com sucesso.",
          ),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }
}
