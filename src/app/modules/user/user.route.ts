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
// router.get("/",auth(USER_ROLE.admin),UserControllers.getAllUsers)
router.get("/single-user/:userId",UserControllers.getSingleUser)
// router.patch("/update-role",auth(USER_ROLE.admin),UserControllers.updateUserRole)
router.get("/checked-userId",UserControllers.isExistsUserId)
router.patch("/update-userId",UserControllers.updateUserID)
export const UserRoutes=router