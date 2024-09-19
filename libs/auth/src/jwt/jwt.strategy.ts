import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import jwks, { passportJwtSecret } from "jwks-rsa";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "../utils/configuration";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configuration: ConfigService<EnvironmentVariables>) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configuration.get("AUTH0_DOMAIN")}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configuration.get("AUTH0_IDENTIFIER"),
      issuer: `${configuration.get("AUTH0_DOMAIN")}`,
      algorithms: ["RS256"],
    });
  }
  validate(payload: any): any {
    console.log(payload);
    return payload;
  }
}
