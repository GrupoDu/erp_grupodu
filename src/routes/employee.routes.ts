import { Router, type Request, type Response } from "express";
import EmployeeController from "../controllers/employee.controller.js";
import { prisma } from "../../lib/prisma.js";
import EmployeeService from "../services/employee.service.js";
import { adminAuthMiddleware } from "../middlewares/adminAuth.middleware.js";
import { getTokenMiddleware } from "../middlewares/getToken.middleware.js";

const router: Router = Router();
const employeeService = new EmployeeService(prisma);
const employeeController = new EmployeeController(employeeService);

router.get("/", getTokenMiddleware, async (req: Request, res: Response) => {
  await employeeController.getAllEmployeesData(req, res);
});
router.post(
  "/",
  getTokenMiddleware,
  adminAuthMiddleware,
  (req: Request, res: Response) =>
    employeeController.createNewEmployee(req, res),
);
router.get(
  "/:employee_uuid",
  getTokenMiddleware,
  adminAuthMiddleware,
  (req: Request, res: Response) =>
    employeeController.getEmployeeDataById(req, res),
);
router.delete(
  "/:employee_uuid",
  getTokenMiddleware,
  adminAuthMiddleware,
  (req: Request, res: Response) => employeeController.removeEmployee(req, res),
);
router.put(
  "/:employee_uuid",
  getTokenMiddleware,
  adminAuthMiddleware,
  (req: Request, res: Response) => employeeController.updateEmployee(req, res),
);
router.put(
  "/activity/:employee_uuid",
  getTokenMiddleware,
  (req: Request, res: Response) =>
    employeeController.incrementEmployeeActivityQuantity(req, res),
);
router.put(
  "/produced-quantity/:employee_uuid",
  getTokenMiddleware,
  (req: Request, res: Response) =>
    employeeController.incrementEmployeeProductsProducedQuantity(req, res),
);

export default router;
