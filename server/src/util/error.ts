import { env } from "./env";

const FLAG_SHOW_GENERIC_DEV = env.FLAG_SHOW_GENERIC_DEV || false;

export function returnError(message: string): string {
	if (process.env.NODE_ENV === "development" && FLAG_SHOW_GENERIC_DEV) {
		return message;
	} else {
		return env.GENERIC_ERROR || "Server Error";
	}
}
