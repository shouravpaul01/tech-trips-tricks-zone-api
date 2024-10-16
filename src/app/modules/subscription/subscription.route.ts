import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { upload } from '../../config/multer.config'
import parseData from '../../middlewares/parseData'
import { subscriptionValidationSchema } from './subscription.validation'
import { SubscriptionController } from './subscription.controller'
const router=express.Router()

router.post("/create-subscription/:userId",upload.array("images"),parseData, validateRequest(subscriptionValidationSchema),SubscriptionController.subscriptionInto)



export const SubscriptionRoutes=router