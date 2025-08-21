import { Request, Response, NextFunction } from "express";
import { supabase } from "../supabase/client";

export const dataFilter = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = req.body;

		if (!data || Object.keys(data).length === 0) {
			return res
				.status(403)
				.json({ ok: false, message: "Error on request: Missing data" });
		}

		const { data: regexRules, error } = await supabase
			.from("regex")
			.select("Regex")
			.not("Regex", "is", null);

		if (error) {
			console.error("Database error:", error);
			return next();
		}

		if (!regexRules || regexRules.length === 0) {
			return next();
		}

		const regexPatterns: RegExp[] = [];
		for (const rule of regexRules) {
			try {
				const regexMatch = rule.Regex.match(/^\/(.*)\/([gimy]*)$/);
				if (regexMatch) {
					const pattern = regexMatch[1];
					const flags = regexMatch[2] || "";
					regexPatterns.push(new RegExp(pattern, flags));
				}
			} catch (e) {
				console.error("Error parsing regex:", rule.Regex, e);
			}
		}

		const extractValues = (obj: any): string[] => {
			let values: string[] = [];

			for (const key in obj) {
				if (obj.hasOwnProperty(key)) {
					const value = obj[key];

					if (typeof value === "string") {
						values.push(value);
					} else if (typeof value === "number" || typeof value === "boolean") {
						values.push(value.toString());
					} else if (Array.isArray(value)) {
						values = values.concat(extractValues(value));
					} else if (typeof value === "object" && value !== null) {
						values = values.concat(extractValues(value));
					}
				}
			}

			return values;
		};

		const allValues = extractValues(data);

		for (const value of allValues) {
			for (const regex of regexPatterns) {
				if (regex.test(value)) {
					console.log(`[FILT] Blocked term detected: ${value}`);
					return res.status(403).json({
						ok: false,
						message: `System blocked request: "${value}" is a blocked term`,
					});
				}

				regex.lastIndex = 0;
			}
		}

		console.log(`[FILT] Request passed filtering`);
		next();
	} catch (error) {
		console.error("Error in dataFilter middleware:", error);
		next();
	}
};
