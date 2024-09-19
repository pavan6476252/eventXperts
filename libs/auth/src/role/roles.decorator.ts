import { ROLE_TYPE, USER_ROLE_KEY } from "@app/shared";
import { SetMetadata } from "@nestjs/common";


export const Roles = (...roles: ROLE_TYPE[]) =>
  SetMetadata(USER_ROLE_KEY, roles);
