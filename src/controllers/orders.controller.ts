import type { Request, Response } from "express";
import OrdersService from "../services/orders.service.js";
import type { IOrderCreate, IOrderUpdate } from "../types/orders.interface.js";
import errorResponseWith from "../utils/errorResponseWith.js";
import successResponseWith from "../utils/successResponseWith.js";
import {
  REQUIRED_FIELDS_MESSAGE,
  MISSING_FIELDS_MESSAGE,
} from "../constants/messages.constants.js";
import { hasValidString } from "../utils/hasValidString.js";
import checkMissingFields from "../utils/checkMissingFields.js";
import { OrderSchema, OrderUpdateSchema } from "../schemas/order.schema.js";

/**
 * Controller responsável por gerenciar pedidos
 *
 * @class OrdersController
 * @see OrdersService
 */
class OrdersController {
  private _ordersService: OrdersService;

  /** @param {OrdersService} ordersService - Instância do serviço de pedidos */
  constructor(ordersService: OrdersService) {
    this._ordersService = ordersService;
  }

  /**
   * Método responsável por retornar todos os pedidos
   *
   * @returns {Promise<Response>} - Objeto com todos os pedidos
   * @param {Request} req - Request express
   * @param {Response} res - Response express
   * @see OrdersController
   */
  async getOrders(req: Request, res: Response): Promise<Response> {
    try {
      const orders = await this._ordersService.getOrders();
      return res
        .status(200)
        .json(successResponseWith(orders, "Pedidos encontrados com sucesso."));
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  /**
   * Método responsável por retornar um pedido por ID
   *
   * @returns {Promise<Response>} - Objeto com o pedido encontrado
   * @param {Request} req - Request express
   * @param {Response} res - Response express
   */
  async getOrderById(req: Request, res: Response): Promise<Response> {
    const { order_id } = req.params;

    try {
      if (!hasValidString(order_id)) {
        return res
          .status(422)
          .json(
            errorResponseWith(
              REQUIRED_FIELDS_MESSAGE(["order_id"]),
              422,
              MISSING_FIELDS_MESSAGE,
            ),
          );
      }

      const order = await this._ordersService.getOrderById(order_id);

      if (!order) {
        return res
          .status(404)
          .json(errorResponseWith("Pedido não encontrado", 404));
      }

      return res
        .status(200)
        .json(successResponseWith(order, "Pedido encontrado com sucesso."));
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  /**
   * Método responsável por criar um novo pedido
   *
   * @returns {Promise<Response>} - Objeto com o pedido criado
   * @param {Request} req - Request express
   * @param {Response} res - Response express
   * @see OrdersController
   */
  async createOrder(req: Request, res: Response): Promise<Response> {
    try {
      const newOrderData = req.body as IOrderCreate;
      const { schemaErr, isMissingFields, requiredFieldsMessage } =
        checkMissingFields(newOrderData, OrderSchema);

      if (isMissingFields) {
        return res
          .status(422)
          .json(errorResponseWith(schemaErr, 422, requiredFieldsMessage));
      }

      const newOrder = await this._ordersService.createOrder(newOrderData);

      return res
        .status(201)
        .json(successResponseWith(newOrder, "Pedido criado com sucesso", 201));
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  /**
   * Método responsável por atualizar um pedido
   *
   * @returns {Promise<Response>} - Objeto com o pedido atualizado
   * @param {Request} req - Request express
   * @param {Response} res - Response express
   * @see OrdersController
   */
  async updateOrder(req: Request, res: Response): Promise<Response> {
    const { order_id } = req.params;
    const updateData = req.body as IOrderUpdate;

    try {
      const { isMissingFields } = checkMissingFields(
        updateData,
        OrderUpdateSchema,
      );

      if (!hasValidString(order_id)) {
        return res
          .status(422)
          .json(
            errorResponseWith(
              REQUIRED_FIELDS_MESSAGE(["order_id"]),
              422,
              MISSING_FIELDS_MESSAGE,
            ),
          );
      }

      if (isMissingFields) {
        return res
          .status(400)
          .json(
            errorResponseWith(
              "Nenhum campo para atualização foi fornecido",
              400,
            ),
          );
      }

      const updatedOrder = await this._ordersService.updateOrder(
        order_id,
        updateData,
      );

      if (!updatedOrder) {
        return res
          .status(404)
          .json(errorResponseWith("Pedido não encontrado", 404));
      }

      return res
        .status(200)
        .json(
          successResponseWith(updatedOrder, "Pedido atualizado com sucesso."),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  /**
   * Método responsável por atualizar o status de um pedido
   *
   * @returns {Promise<Response>} - Objeto com o pedido atualizado
   * @param {Request} req - Request express
   * @param {Response} res - Response express
   * @see OrdersController
   */
  async updateOrderStatus(req: Request, res: Response): Promise<Response> {
    const { order_id } = req.params;
    const { status } = req.body as { status: string };

    try {
      if (!hasValidString(order_id) || !hasValidString(status)) {
        return res
          .status(422)
          .json(
            errorResponseWith(
              REQUIRED_FIELDS_MESSAGE(["order_id", "status"]),
              422,
              MISSING_FIELDS_MESSAGE,
            ),
          );
      }

      const result = await this._ordersService.updateOrderStatus(
        order_id,
        status,
      );

      return res
        .status(200)
        .json(
          successResponseWith(
            result,
            `Status do pedido atualizado para: ${status}`,
          ),
        );
    } catch (err) {
      const error = err as Error;

      const { isOrderOnFinalStatus, isCurrentStatusInvalid, isOrderNotFound } =
        this.errorsCase(error);

      if (isOrderNotFound) {
        return res
          .status(404)
          .json(errorResponseWith("Pedido não encontrado", 404));
      }

      if (isCurrentStatusInvalid) {
        return res
          .status(400)
          .json(errorResponseWith("Status atual inválido", 400));
      }

      if (isOrderOnFinalStatus) {
        return res
          .status(400)
          .json(errorResponseWith("Pedido já está no status final", 400));
      }

      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  /**
   * Método responsável por verificar o tipo de erro
   *
   * @returns {Object} - Objeto com casos de erros diferentes
   * @param error {Error}
   * @private
   */
  private errorsCase(error: Error) {
    const isOrderOnFinalStatus =
      error.message === "Order is already in final status";
    const isCurrentStatusInvalid = error.message === "Invalid current status";
    const isOrderNotFound = error.message === "Order not found";

    return { isOrderNotFound, isCurrentStatusInvalid, isOrderOnFinalStatus };
  }
}

export default OrdersController;
