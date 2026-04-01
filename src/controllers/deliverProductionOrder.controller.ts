import type { Request, Response } from "express";
import type DeliverProductionOrderService from "../services/deliverProductionOrder.service.js";
import errorResponseWith from "../utils/errorResponseWith.js";
import successResponseWith from "../utils/successResponseWith.js";
import { DeliverProductionOrderSchema } from "../schemas/deliverProductionOrder.schema.js";
import checkMissingFields from "../utils/checkMissingFields.js";
import { hasValidString } from "../utils/hasValidString.js";

/**
 * Controller responsável por gerenciar a quantidade de produtos entregues.
 *
 * @class DeliverProductionOrderController
 * @see DeliverProductionOrderService
 */
class DeliverProductionOrderController {
  private _deliverProductionOrderService: DeliverProductionOrderService;

  /** @param {DeliverProductionOrderService} deliverProductionOrderService - Serviço de entrega de produção */
  constructor(deliverProductionOrderService: DeliverProductionOrderService) {
    this._deliverProductionOrderService = deliverProductionOrderService;
  }

  /**
   * Método responsável por gerenciar a quantidade de produtos entregues.
   *
   * @param {Request} req - Request express
   * @param {Response} res - Response express
   * @returns {Promise<Response>} Objeto com a quantidade de produtos entregues
   * @see DeliverProductionOrderService
   */
  async deliverProductionOrder(req: Request, res: Response): Promise<Response> {
    const { production_order_id } = req.params;
    const { delivered_product_quantity, requested_product_quantity } =
      req.body as IDeliverValuesType;
    const deliveryData = {
      delivered_product_quantity,
      requested_product_quantity,
    };
    const { isMissingFields, requiredFieldsMessage, schemaErr } =
      checkMissingFields(deliveryData, DeliverProductionOrderSchema);

    try {
      if (!hasValidString(production_order_id) || isMissingFields) {
        return res
          .status(422)
          .json(errorResponseWith(schemaErr, 422, requiredFieldsMessage));
      }

      const deliveredProductionOrder =
        await this._deliverProductionOrderService.deliverProductionOrder(
          production_order_id,
          delivered_product_quantity,
          requested_product_quantity,
        );

      return res
        .status(200)
        .json(
          successResponseWith(
            deliveredProductionOrder,
            "Ordem de produção entregue com sucesso.",
          ),
        );
    } catch (err) {
      const error = err as Error;
      const assistantsTaskNotDelivered =
        error.message.includes("não concluíram");
      const assistantsNotDefined = error.message.includes(
        "assistentes foram definidos.",
      );

      if (assistantsTaskNotDelivered)
        return res
          .status(400)
          .json(errorResponseWith(error.message, 400, error.message));

      if (assistantsNotDefined)
        return res
          .status(400)
          .json(errorResponseWith(error.message, 400, error.message));

      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }
}

interface IDeliverValuesType {
  delivered_product_quantity: number;
  requested_product_quantity: number;
}

export default DeliverProductionOrderController;
