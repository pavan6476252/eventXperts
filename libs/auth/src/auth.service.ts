// auth.service.ts
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "./utils/configuration";
import axios from "axios";
import { ROLE_TYPE } from "@app/shared";

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService<EnvironmentVariables>) {}

  async assignRolesToAuth0(userId: string, role: ROLE_TYPE[]): Promise<any> {
    const domain = this.configService.get("AUTH0_DOMAIN");
    const clientId = this.configService.get("AUTH0_CLIENT_ID");
    const clientSecret = this.configService.get("AUTH0_CLIENT_SECRET");

    const tokenResponse = await axios.post(`https://${domain}/oauth/token`, {
      client_id: clientId,
      client_secret: clientSecret,
      audience: `https://${domain}/api/v2/`,
      grant_type: "client_credentials",
    });

    const token = tokenResponse.data.access_token;

    const response = await axios.post(
      `https://${domain}/api/v2/users/${userId}/roles`,
      { roles: role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }

  async getUserRoles(userId: string): Promise<any> {
    const domain = this.configService.get("AUTH0_DOMAIN");
    const clientId = this.configService.get("AUTH0_CLIENT_ID");
    const clientSecret = this.configService.get("AUTH0_CLIENT_SECRET");

    const tokenResponse = await axios.post(`https://${domain}/oauth/token`, {
      client_id: clientId,
      client_secret: clientSecret,
      audience: `https://${domain}/api/v2/`,
      grant_type: "client_credentials",
    });

    const token = tokenResponse.data.access_token;

    const response = await axios.get(
      `https://${domain}/api/v2/users/${userId}/roles`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }

  rolesMatch(dbRoles: ROLE_TYPE[], auth0Roles: ROLE_TYPE[]): boolean {
    return dbRoles.sort().toString() === auth0Roles.sort().toString();
  }
}
