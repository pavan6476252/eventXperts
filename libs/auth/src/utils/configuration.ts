export interface EnvironmentVariables {
  AUTH0_ID: string;
  AUTH0_NAME: string;
  AUTH0_IDENTIFIER: string;

  AUTH0_DOMAIN: string;
  AUTH0_CLIENT_ID: string;
  AUTH0_CLIENT_SECRET: string;
}

export default (): EnvironmentVariables => ({
  AUTH0_ID: process.env.AUTH0_ID || '',
  AUTH0_NAME: process.env.AUTH0_NAME || '',
  AUTH0_IDENTIFIER: process.env.AUTH0_IDENTIFIER || '',
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN || '',
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID || '',
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET || '',
});
