import { IConfigData } from "./config.interface";

export const DEFAULT_CONFIG: IConfigData = {
  algolio: {
    admin_api_key: "",
    application_id: "",
    search_api_key: "",
    write_api_key: "",
  },
  auth: {
    access_token_expires_in: 10,
    access_token_secret: "",
    refresh_token_expires_in: 10,
    refresh_token_secret: "",
  },
  db: {
    url: "",
  },
  node_env: "production",
  logLevel: "",
  port: 3001,
};
