import dotenv from "dotenv";
import { z } from "zod";
import FormatErrors from "./FormatErrors";

type DotEnv = {
  NODE_ENV: "development" | "production";
  HOST: string;
  PORT?: number;
  SESSION_SECRET: string;
  ASSETS_PATH?: string;
};

const serverSchema = z.object({
  NODE_ENV: z.string()
    .refine(item => item === "development" || item === "production", {
      message: "The environment variable NODE_ENV can only be 'development' or 'production'"
    }),
  HOST: z.preprocess((str) => process.env.VERCEL_URL ?? str, // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    z.string(),
  ),
  PORT: z.string().transform(item => Number(item)).optional(),
  SESSION_SECRET: z.string(),
  ASSETS_PATH: z.string().optional()
});

dotenv.config();
const serverEnv = serverSchema.safeParse(process.env);

if(!serverEnv.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    ...FormatErrors(serverEnv.error.format()),);
  throw new Error("Invalid environment variables");
}

export const env = serverEnv.data as DotEnv;