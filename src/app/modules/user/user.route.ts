import express from 'express'
import { UserControllers } from './user.controller'

import { USER_ROLE } from './user.constant'
const router=express.Router()

// router.patch("/update-user",auth(USER_ROLE.user),UserControllers.updateUserInto)
// router.get("/",auth(USER_ROLE.admin),UserControllers.getAllUsers)
router.get("/single-user/:userId",UserControllers.getSingleUser)
// router.patch("/update-role",auth(USER_ROLE.admin),UserControllers.updateUserRole)
router.get("/checked-userId",UserControllers.isExistsUserId)
router.patch("/update-userId",UserControllers.updateUserID)
export const UserRoutes=router