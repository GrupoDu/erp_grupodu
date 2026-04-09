import { vi } from "vitest";

export interface ControllerMocks<TService, TController> {
  mockService: TService;
  controller: TController;
  mockReq: any;
  mockRes: any;
}

export const createControllerMocks = <TService, TController>(
  ServiceClass: new (prisma: any) => TService,
  ControllerClass: new (service: TService) => TController,
  prisma: any,
): ControllerMocks<TService, TController> => {
  const mockService = new ServiceClass(prisma);
  const controller = new ControllerClass(mockService);

  const mockReq = {
    params: {},
    body: {},
    query: {},
  };

  const mockRes = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };

  return {
    mockService,
    controller,
    mockReq,
    mockRes,
  };
};
