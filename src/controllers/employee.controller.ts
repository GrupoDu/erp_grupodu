import type { Request, Response } from "express";
import type EmployeeService from "../services/employee.service.js";
import errorResponseWith from "../utils/errorResponseWith.js";
import successResponseWith from "../utils/successResponseWith.js";
import {
  REQUIRED_FIELDS_MESSAGE,
  MISSING_FIELDS_MESSAGE,
} from "../constants/messages.constants.js";
import checkMissingFields from "../utils/checkMissingFields.js";
import {
  EmployeeCreateSchema,
  EmployeeUpdateSchema,
} from "../schemas/employee.schema.js";
import type {
  IEmployeeCreate,
  IEmployeeUpdate,
} from "../types/employee.interface.js";
import { isNumber } from "class-validator";
import { hasValidString } from "../utils/hasValidString.js";

/**
 * Controller relacionado a operações de funcionários.
 *
 * @class EmployeeController
 * @see EmployeeService
 */
class EmployeeController {
  private _employeeService: EmployeeService;

  /** @param {EmployeeService} employeeService - Serviço de funcionários */
  constructor(employeeService: EmployeeService) {
    this._employeeService = employeeService;
  }

  /**
   * Método responsável por retornar dados de todos os funcionários.
   *
   * @returns {Promise<Response>} - Objeto com todos os funcionários.
   * @param {Request} req - Request express
   * @param {Response} res - Response express
   * @see EmployeeController
   */
  async getAllEmployeesData(req: Request, res: Response): Promise<Response> {
    try {
      const allEmployeesData =
        await this._employeeService.getAllEmployeesData();

      return res
        .status(200)
        .json(
          successResponseWith(
            allEmployeesData,
            "Dados encontrados com sucesso.",
          ),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  /**
   * Método responsável por buscar dados de um funcionário pelo seu UUID.
   *
   * @returns {Promise<Response>} - Objeto com todos os dados do funcionário.
   * @param {Request} req - Request express
   * @param {Response} res - Response express
   * @see EmployeeController
   */
  async getEmployeeDataById(req: Request, res: Response): Promise<Response> {
    const { employee_uuid } = req.params;

    try {
      if (!hasValidString(employee_uuid)) {
        return res
          .status(422)
          .json(
            errorResponseWith(
              REQUIRED_FIELDS_MESSAGE(["employee_uuid"]),
              422,
              MISSING_FIELDS_MESSAGE,
            ),
          );
      }

      const employeeData =
        await this._employeeService.getEmployeeDataById(employee_uuid);

      return res
        .status(200)
        .json(
          successResponseWith(
            employeeData,
            "Dados do funcionário encontrados com sucesso.",
          ),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  /**
   * Método responsável por registrar um novo funcionário.
   *
   * @returns {Promise<Response>} - Retorna objeto com novo funcionário registrado
   * @param {Request} req - Request express
   * @param {Response} res - Response express
   * @see EmployeeController
   */
  async createNewEmployee(req: Request, res: Response): Promise<Response> {
    const newEmployeeData = req.body as IEmployeeCreate;

    try {
      const { isMissingFields, requiredFieldsMessage, schemaErr } =
        checkMissingFields(newEmployeeData, EmployeeCreateSchema);

      if (isMissingFields) {
        return res
          .status(422)
          .json(errorResponseWith(schemaErr, 422, requiredFieldsMessage));
      }

      const newEmployee =
        await this._employeeService.registerNewEmployee(newEmployeeData);

      return res
        .status(201)
        .json(
          successResponseWith(
            newEmployee,
            "Funcionário adicionado ao sistema.",
            201,
          ),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  /**
   * Método responsável por remover um funcionário do sistema.
   *
   * @returns {Promise<Response>} - Retorna objeto com mensagem de sucesso
   * @param {Request} req - Request express
   * @param {Response} res - Response express
   * @see EmployeeController
   */
  async removeEmployee(req: Request, res: Response): Promise<Response> {
    try {
      const { employee_uuid } = req.params;

      if (!hasValidString(employee_uuid)) {
        return res
          .status(422)
          .json(
            errorResponseWith(
              REQUIRED_FIELDS_MESSAGE(["uuid"]),
              422,
              MISSING_FIELDS_MESSAGE,
            ),
          );
      }

      await this._employeeService.removeEmployeeData(employee_uuid);

      return res
        .status(200)
        .json(successResponseWith(null, "Funcionário removido do sistema."));
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  /**
   * Método responsável por atualizar dados de um funcionário.
   *
   * @returns {Promise<Response>} - Retorna objeto com mensagem de sucesso
   * @param {Request} req - Request express
   * @param {Response} res - Response express
   * @see EmployeeController
   */
  async updateEmployee(req: Request, res: Response): Promise<Response> {
    try {
      const updatedEmployeeValues = req.body as IEmployeeUpdate;
      const { employee_uuid } = req.params;
      const { schemaErr, isMissingFields, requiredFieldsMessage } =
        checkMissingFields(updatedEmployeeValues, EmployeeUpdateSchema);

      if (!hasValidString(employee_uuid)) {
        return res
          .status(422)
          .json(errorResponseWith(schemaErr, 422, requiredFieldsMessage));
      }

      if (isMissingFields) {
        return res
          .status(422)
          .json(errorResponseWith(schemaErr, 422, requiredFieldsMessage));
      }

      const updatedEmployee = await this._employeeService.updateEmployeeData(
        updatedEmployeeValues,
        employee_uuid,
      );

      return res
        .status(200)
        .json(
          successResponseWith(
            updatedEmployee,
            "Dados do funcionário atualizados.",
          ),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  /**
   * Método responsável por incrementar a quantidade de atividades de um funcionário.
   *
   * @returns {Promise<Response>} - Retorna objeto com mensagem de sucesso
   * @param {Request} req - Request express
   * @param {Response} res - Response express
   * @see EmployeeController
   */
  async incrementEmployeeActivityQuantity(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const { employee_uuid } = req.params;

      if (!hasValidString(employee_uuid)) {
        return res
          .status(422)
          .json(
            errorResponseWith(
              REQUIRED_FIELDS_MESSAGE(["employee_uuid"]),
              422,
              MISSING_FIELDS_MESSAGE,
            ),
          );
      }

      const updatedEmployeeActivity =
        await this._employeeService.incrementEmployeeActivitiesQuantity(
          employee_uuid,
        );

      return res
        .status(200)
        .json(
          successResponseWith(
            updatedEmployeeActivity,
            "Quantidade de atividades atualizada.",
          ),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  /**
   * Método responsável por incrementar a quantidade de produtos produzidos de um funcionário.
   *
   * @returns {Promise<Response>} - Retorna objeto com mensagem de sucesso
   * @param {Request} req - Request express
   * @param {Response} res - Response express
   * @see EmployeeController
   */
  async incrementEmployeeProductsProducedQuantity(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { employee_uuid } = req.params;
    const { products_quantity } = req.body as { products_quantity: number };

    try {
      if (!hasValidString(employee_uuid) || !isNumber(products_quantity)) {
        return res
          .status(422)
          .json(
            errorResponseWith(
              REQUIRED_FIELDS_MESSAGE(["employee_uuid", "products_quantity"]),
              422,
              MISSING_FIELDS_MESSAGE,
            ),
          );
      }

      const updatedEmployee =
        await this._employeeService.incrementEmployeeProductsProducedQuantity(
          employee_uuid,
          products_quantity,
        );

      return res
        .status(200)
        .json(
          successResponseWith(
            updatedEmployee,
            "Quantidade de produtos produzidos atualizada.",
          ),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }
}

export default EmployeeController;
