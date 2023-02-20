import { ConfigObject } from "@nestjs/config";

const NODE_ENV = process.env.NODE_ENV || "development";

const env: ConfigObject = {};

export async function environment() {
  if (Object.keys(env).length !== 0) {
    return env;
  }

  if (NODE_ENV === "development") {
    await import("dotenv/config");
  }

  env["NODE_ENV"] = NODE_ENV;
  env["host"] = host();
  env["database"] = database();
  env["redis"] = redis();
  return env;
}

function host() {
  return {
    URL: process.env.URL_ROOT || "0.0.0.0",
    PORT: parseInt(process.env.PORT || "8000"),
    APP_URL: process.env.APP_URL || "0.0.0.0",
    APP_PORT: parseInt(process.env.APP_PORT || "50001"),
  };
}

function redis() {
  return {
    HOST: process.env.REDIS_HOST || "redis",
    PORT: parseInt(process.env.REDIS_PORT || "6379"),
    USER: process.env.REDIS_USER,
    PASSWORD: process.env.REDIS_PASSWORD,
  };
}

function database() {
  return {
    URI:
      process.env.POSTGRES_URI ||
      "postgres://app_user:password@postgres:5432/app_db",
  };
}