import express from "express";
import cors from "cors";

import { AuthRoutes } from "./app/modules/auth/auth.route"
import globalErrorHandler from "./app/middlewares/globalErrorHandler"

const app = express()

//Parser
app.use(express.json());
app.use(cors());
//Routes
app.use("/api/auth",AuthRoutes)
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

//Global error handler
app.use(globalErrorHandler)

export default app