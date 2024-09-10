export interface IConfigDatabase {
  url: string;
}

export interface IAuthConfig {
  access_token_secret: string;
  access_token_expires_in: number;

  refresh_token_secret: string;
  refresh_token_expires_in: number;
}

export interface IAlgolioConfig {
  application_id: string;
  search_api_key: string;
  write_api_key: string;
  admin_api_key: string;
}

export interface IConfigData {
  node_env: 'production'| 'development' | string;

  port: number;

  db: IConfigDatabase;

  logLevel: string;

  auth: IAuthConfig;

  algolio: IAlgolioConfig;
}
