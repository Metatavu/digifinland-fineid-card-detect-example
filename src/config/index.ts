import { cleanEnv, url, str, num } from "envalid";

const env = cleanEnv(import.meta.env, {
  VITE_KEYCLOAK_URL: url(),
  VITE_KEYCLOAK_REALM: str(),
  VITE_KEYCLOAK_CLIENT_ID: str(),
  VITE_CSC_API_URL: url(),
  VITE_CSC_CHECK_INTERVAL: num()
});

const config = {
  auth: {
    url: env.VITE_KEYCLOAK_URL,
    realm: env.VITE_KEYCLOAK_REALM,
    clientId: env.VITE_KEYCLOAK_CLIENT_ID,
  },
  csc: {
    url: env.VITE_CSC_API_URL,
    checkInterval: env.VITE_CSC_CHECK_INTERVAL
  }
} as const;

export default config;