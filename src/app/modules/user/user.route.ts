import express from 'express'
import { UserControllers } from './user.controller'

import { USER_ROLE } from './user.constant'
import { upload } from '../../config/multer.config'
import parseData from '../../middlewares/parseData'
import auth from '../../middlewares/auth'
const router=express.Router()

router.patch("/update-user/:userId", upload.fields([
    { name: 'coverImage', maxCount: 1 }, 
    { name: 'profileImage', maxCount: 1 },
  ]), parseData,UserControllers.updateUserInto)
router.get("/",UserControllers.getAllUsers)
router.get("/single-user",auth(USER_ROLE.User),UserControllers.getSingleUser)
router.get("/single-user-by-id/:userId",auth(USER_ROLE.User),UserControllers.getSingleUserById)
router.get("/single-user-by-email",UserControllers.getSingleUserByEmail)
router.patch("/update-role",UserControllers.updateUserRole)
router.patch("/update-active-status",UserControllers.updateUserActiveStatus)
router.get("/checked-userId",UserControllers.isExistsUserId)
router.patch("/update-userId",UserControllers.updateUserID)
router.patch("/following/:followingUserId",auth(USER_ROLE.User),UserControllers.followingUser)
router.get("/get-all-user-for-following",auth(USER_ROLE.User),UserControllers.getAllUsersForFollowing)
router.patch("/unfollow/:followingUserId",auth(USER_ROLE.User),UserControllers.unFollowUser)
router.patch("/follow-back/:followingUserId",auth(USER_ROLE.User),UserControllers.followBackUser)
export const UserRoutes=router