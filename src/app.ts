import { startApp } from "obscur-server";
import { env } from "./env/server";


void startApp(env.HOST, env.PORT ?? 80);
