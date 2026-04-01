import type TrelloApiService from "../services/feedback.service.js";
import type { Request, Response } from "express";
import errorResponseWith from "../utils/errorResponseWith.js";
import successResponseWith from "../utils/successResponseWith.js";
import checkMissingFields from "../utils/checkMissingFields.js";
import { TrelloCardSchema } from "../schemas/trelloCard.schema.js";

/**
 * Controller responsável por gerenciar as operações relacionadas ao feedback.
 *
 * @see TrelloApiService
 * @method createFeedbackCard
 */
class TrelloApiController {
  private _trelloApiService: TrelloApiService;

  /** @param {TrelloApiService} trelloApiService - Serviço de feedback */
  constructor(trelloApiService: TrelloApiService) {
    this._trelloApiService = trelloApiService;
  }

  /**
   * Cria um card no Trello com o feedback do usuário.
   *
   * @returns {Promise<Response>} - Retorna objeto com mensagem de sucesso
   * @param {Request} req - Request express
   * @param {Response} res - Response express
   * @see TrelloApiService
   */
  async createFeedbackCard(req: Request, res: Response): Promise<Response> {
    try {
      const cardData = req.body as ICardParams;
      const { isMissingFields, requiredFieldsMessage, schemaErr } =
        checkMissingFields(cardData, TrelloCardSchema);

      if (isMissingFields) {
        return res
          .status(422)
          .json(errorResponseWith(schemaErr, 422, requiredFieldsMessage));
      }

      const newCard = await this._trelloApiService.createFeedbackCard(
        cardData.card_name,
        cardData.card_description,
      );

      return res
        .status(201)
        .json(
          successResponseWith(newCard, "Feedback enviado com sucesso.", 201),
        );
    } catch (err) {
      const error = err as Error;
      return res
        .status(500)
        .json(
          errorResponseWith(
            "Ocorreu um erro ao enviar o feedback.",
            500,
            error.message,
          ),
        );
    }
  }
}

interface ICardParams extends Record<string, unknown> {
  card_name: string;
  card_description: string;
}

export default TrelloApiController;
