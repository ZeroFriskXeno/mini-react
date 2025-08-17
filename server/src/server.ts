import fs from "fs";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import { env } from "./util/env";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth";
import statusRoutes from "./routes/status";
import appRoutes from "./routes/app";
import { http404 } from "./controllers/http";

const app = express();
const port = 3000;

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", statusRoutes);
app.use("/api", authRoutes);
app.use("/api", appRoutes);

const clientDist = path.join(__dirname, "../../client/dist");

if ( fs.existsSync(clientDist) ) {
	app.use(express.static(clientDist));
	app.get("/", (req, res) => {
		res.sendFile(path.join(clientDist, "index.html"));
	});
} else {
	app.get("/", (req, res) => {
		res.send("Hello from TypeScript Server!");
	});
	app.use("/", http404);
}

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
