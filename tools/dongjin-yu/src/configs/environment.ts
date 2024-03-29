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
  env["redis"] = redis();
  env["queue"] = queue();
  env["s3"] = s3();
  return env;
}

function redis() {
  return {
    HOST: process.env.REDIS_HOST,
    PORT: parseInt(process.env.REDIS_PORT || "6379"),
    USER: process.env.REDIS_USER,
    PASSWORD: process.env.REDIS_PASSWORD,
  };
}

function queue() {
  return {
    HOST: process.env.QUEUE_HOST,
    PORT: parseInt(process.env.QUEUE_PORT || "6379"),
    USER: process.env.QUEUE_USER,
    PASSWORD: process.env.QUEUE_PASSWORD,
  };
}
function s3() {
  return {
    ACCESS_KEY: process.env.S3_ACCESS_KEY,
    SECRET_KEY: process.env.S3_SECRET_KEY,
    REGION: process.env.S3_REGION,
  };
}
