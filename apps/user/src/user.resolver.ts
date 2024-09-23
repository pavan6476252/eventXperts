import { Query, Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@app/auth/jwt/jwt-auth.guard";
import { CurrentUser, RoleGuard, Roles } from "@app/auth";
import { ROLE_TYPE, UserPrincipal } from "@app/shared";
import { AuthenticatedRequest } from "@app/auth/interface/authenticated-request.interface";

@Resolver("user")
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query()
  async getUser(@CurrentUser() user: UserPrincipal) {
    return this.userService.getUserById(user.id);
  }

  @Mutation()
  @UseGuards(JwtAuthGuard)
  async registerUser(@CurrentUser() user: UserPrincipal) {
    return this.userService.registerUser(user);
  }
}
