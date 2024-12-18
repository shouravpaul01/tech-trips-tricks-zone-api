import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { subscriptionValidationSchema } from './subscription.validation'
import { SubscriptionController } from './subscription.controller'
const router=express.Router()

router.post("/create-subscription", validateRequest(subscriptionValidationSchema),SubscriptionController.subscriptionInto)
router.get("/monthly-payments", SubscriptionController.getMonthlyPayments)


export const SubscriptionRoutes=router