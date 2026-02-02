import type { IUserPublic } from "./user.interface.ts";

declare global {
  namespace Express {
    interface Request {
      user?: IUserPublic;
    }
  }
}
