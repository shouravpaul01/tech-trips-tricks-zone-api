import express from "express";
import cors from "cors";

import { AuthRoutes } from "./app/modules/auth/auth.route"
import globalErrorHandler from "./app/middlewares/globalErrorHandler"
import { UserRoutes } from "./app/modules/user/user.route";
import { PostRoutes } from "./app/modules/post/post.route";
import { CommentRoutes } from "./app/modules/comment/comment.route";
import { SubscriptionRoutes } from "./app/modules/subscription/subscription.route";
import { PaymentRoutes } from "./app/modules/payment/payment.route";

const app = express()

//Parser
app.use(express.json());
app.use(cors());
//Routes
app.use("/api/auth",AuthRoutes)
app.use("/api/users",UserRoutes)
app.use("/api/posts",PostRoutes)
app.use("/api/comments",CommentRoutes)
app.use("/api/subscriptions",SubscriptionRoutes)
app.use("/api/payments",PaymentRoutes)
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

//Global error handler
app.use(globalErrorHandler as any)

export default app