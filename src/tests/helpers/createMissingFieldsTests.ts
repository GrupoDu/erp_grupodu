import type { Request, Response } from "express";
import { describe, it, expect } from "vitest";

interface TestCaseMissingFields {
  description: string;
  setup: () => { req: any; res: any };
}

interface ControllerMethod {
  (req: Request, res: Response): Promise<Response>;
}

/**
 * Retorna teste de status 422.
 * @param methodName
 * @param controllerMethod
 * @param testCases
 */
export default function createMissingFieldsTests(
  methodName: string,
  controllerMethod: ControllerMethod,
  testCases: TestCaseMissingFields[],
) {
  describe(`status 422 tests for ${methodName}`, () => {
    testCases.forEach(({ description, setup }) => {
      it(`should return status 422 for ${description}`, async () => {
        const { req, res } = setup();
        await controllerMethod(req, res);
        expect(res.status).toHaveBeenCalledWith(422);
      });
    });
  });
}
