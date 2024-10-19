import express from 'express'
import { UserControllers } from './user.controller'

import { USER_ROLE } from './user.constant'
import { upload } from '../../config/multer.config'
import parseData from '../../middlewares/parseData'
const router=express.Router()

router.patch("/update-user/:userId", upload.fields([
    { name: 'coverImage', maxCount: 1 }, 
    { name: 'profileImage', maxCount: 1 },
  ]), parseData,UserControllers.updateUserInto)
router.get("/",UserControllers.getAllUsers)
router.get("/single-user/:userId",UserControllers.getSingleUser)
router.patch("/update-role",UserControllers.updateUserRole)
router.patch("/update-active-status",UserControllers.updateUserActiveStatus)
router.get("/checked-userId",UserControllers.isExistsUserId)
router.patch("/update-userId",UserControllers.updateUserID)
export const UserRoutes=router