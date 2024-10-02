import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	client: {
		NEXT_PUBLIC_WEB_URL: z.string(),
	},
	server: {
		MONGODB_URI: z.string(),
	},
	runtimeEnv: {
		NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
		MONGODB_URI: process.env.MONGODB_URI,
	},
});
