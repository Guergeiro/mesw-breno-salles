import { ConfigObject } from "@nestjs/config";

const NODE_ENV = process.env.NODE_ENV || "development";
const VERSION = process.env.npm_package_version || NODE_ENV;
const NAME = process.env.npm_package_name || NODE_ENV;

const env: ConfigObject = {};

export async function environment() {
  if (Object.keys(env).length !== 0) {
    return env;
  }

  if (NODE_ENV === "development") {
    await import("dotenv/config");
  }

  env["NODE_ENV"] = NODE_ENV;
  env["VERSION"] = VERSION;
  env["NAME"] = NAME;
  env["database"] = database();
  env["host"] = host();
  env["redis"] = redis();
  env["s3"] = s3();
  env["throttler"] = throttler();
  return env;
}

function database() {
  return {
    URI: process.env.POSTGRES_URI,
  };
}

function host() {
  return {
    URL: process.env.URL || "0.0.0.0",
    PORT: parseInt(process.env.PORT || "8000"),
    APP_URL: process.env.APP_URL || "0.0.0.0:3001",
  };
}

function redis() {
  return {
    HOST: process.env.REDIS_HOST,
    PORT: parseInt(process.env.REDIS_PORT || "6379"),
    USER: process.env.REDIS_USER,
    PASSWORD: process.env.REDIS_PASSWORD,
  };
}

function s3() {
  return {
    ACCESS_KEY: process.env.S3_ACCESS_KEY,
    SECRET_KEY: process.env.S3_SECRET_KEY,
    REGION: process.env.S3_REGION,
  };
}

function throttler() {
  return {
    TTL: parseInt(process.env.THROTTLER_TTL || "60"),
    LIMIT: parseInt(process.env.THROTTLER_LIMIT || "10"),
  };
}
