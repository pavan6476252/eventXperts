import { ROLE_TYPE } from "../utils/constants";

export interface UserPrincipal {
  readonly username: string;
  readonly id: string;
  readonly email: string;
  readonly roles: ROLE_TYPE[];
}
