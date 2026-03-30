import type TrelloApiService from "../services/feedback.service.js";
import type { Request, Response } from "express";
import errorResponseWith from "../utils/errorResponseWith.js";
import successResponseWith from "../utils/successResponseWith.js";
import checkMissingFields from "../utils/checkMissingFields.js";
import { TrelloCardSchema } from "../schemas/trelloCard.schema.js";

/**
 * Controller responsável por gerenciar as operações relacionadas ao feedback.
 * @see TrelloApiService
 * @method createFeedbackCard
 */
class TrelloApiController {
  private _trelloApiService: TrelloApiService;

  constructor(trelloApiService: TrelloApiService) {
    this._trelloApiService = trelloApiService;
  }

  // async getAllLists(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const lists = await this.trelloApiService.getAllLists();
  //     return res.status(200).json(lists);
  //   } catch (err) {
  //     return res.status(500).json({
  //       message: "Ocorreu um erro ao buscar as listas.",
  //       error: (err as Error).message,
  //     });
  //   }
  // }

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
