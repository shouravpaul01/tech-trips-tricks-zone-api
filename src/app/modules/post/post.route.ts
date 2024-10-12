import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { postValidation } from './post.validation'
import { PostController } from './post.controller'
import { upload } from '../../config/multer.config'
import parseData from '../../middlewares/parseData'
const router=express.Router()

router.post("/create-post",upload.array("images"),parseData, validateRequest(postValidation),PostController.createPostInto)
router.patch("/update-post/:postId",validateRequest(postValidation),PostController.updatePostInto)

export const PostRoutes=router