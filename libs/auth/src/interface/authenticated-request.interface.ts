import { UserPrincipal } from "@app/shared";
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  readonly user: UserPrincipal;
}
