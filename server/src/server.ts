import cors from "cors";
import express from "express"
import { env } from "./util/env";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth"
import statusRoutes from './routes/status'
import { http404 } from './controllers/http';

const app = express();
const port = env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => { res.send('Hello from TypeScript Server!'); })

app.use('/api/', [statusRoutes, authRoutes]);
app.use('/', http404);

app.listen(port, () => { console.log(`server running on port ${port}`); })
