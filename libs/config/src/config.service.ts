import { Injectable } from "@nestjs/common";
import {
  IAlgolioConfig,
  IAuthConfig,
  IConfigData,
  IConfigDatabase,
} from "./config.interface";
import { DEFAULT_CONFIG } from "./config.default";

@Injectable()
export class ConfigService {
  private config: IConfigData;
  constructor(data: IConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }

  public loadFromEnv() {
    this.config = this.parseConfigFromEnv(process.env);
  }

  private parseConfigFromEnv(env: NodeJS.ProcessEnv): IConfigData {
    return {
      node_env: env.NODE_ENV || DEFAULT_CONFIG.node_env,
      algolio: this.parseAlgolioConfig(env, DEFAULT_CONFIG.algolio),
      port: parseInt(env.PORT!, DEFAULT_CONFIG.port),
      db: this.parseDBConfig(env, DEFAULT_CONFIG.db),
      auth: this.parseAuthConfig(env, DEFAULT_CONFIG),
      logLevel: env.LOG_LEVEL!,
    };
  }
  private parseAuthConfig(
    env: NodeJS.ProcessEnv,
    DEFAULT_CONFIG: IConfigData
  ): IAuthConfig {
    return {
      access_token_secret: env.ACCESS_TOKEN_SECRET,
      access_token_expires_in: Number(env.ACCESS_TOKEN_EXPIRES_IN),
      refresh_token_secret: env.REFRESH_TOKEN_SECRET,
      refresh_token_expires_in: Number(env.REFRESH_TOKEN_EXPIRES_IN),
    };
  }

  private parseDBConfig(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<IConfigDatabase>
  ) {
    return {
      url: env.DATABASE_URL || defaultConfig.url,
    };
  }
  private parseAlgolioConfig(
    env: NodeJS.ProcessEnv,
    defaultConfig: Readonly<IAlgolioConfig>
  ): IAlgolioConfig {
    return {
      admin_api_key: env.ALGOLIO_ADMIN_API_KEY,
      application_id: env.ALGOLIO_APPLICATION_ID,
      search_api_key: env.ALGOLIO_SEARCH_API_KEY,
      write_api_key: env.ALGOLIO_WRITE_API_KEY,
    };
  }
  public get(): Readonly<IConfigData> {
    return this.config;
  }
}
