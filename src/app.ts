import express from "express";
import cors from "cors";

import { AuthRoutes } from "./app/modules/auth/auth.route"
import globalErrorHandler from "./app/middlewares/globalErrorHandler"
import { UserRoutes } from "./app/modules/user/user.route";

const app = express()

//Parser
app.use(express.json());
app.use(cors());
//Routes
app.use("/api/auth",AuthRoutes)
app.use("/api/users",UserRoutes)
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

//Global error handler
app.use(globalErrorHandler as any)

export default app