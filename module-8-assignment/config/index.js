import dotenv from "dotenv";
dotenv.config();

const REQUIRED_ENV_VARS = [
  "PORT",
  "NODE_ENV",
  "JWT_SECRET_KEY",
  "API_KEY",
  "ALLOWED_ORIGIN",
];

const missing = REQUIRED_ENV_VARS.filter((name) => !process.env[name]);

if (missing.length > 0) {
  console.error(
    ` Missing required environment variables:\n  - ${missing.join("\n  - ")}\n\n` +
      `Please set them in your .env file.`,
  );
  process.exit(1);
}

const config = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  apiKey: process.env.API_KEY,
  allowedOrigin: process.env.ALLOWED_ORIGIN,
};

export default config;
