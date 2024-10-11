import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { postValidation } from './post.validation'
import { PostController } from './post.controller'
const router=express.Router()

router.post("/create-post",validateRequest(postValidation),PostController.createPostInto)
router.patch("/update-post/:postId",validateRequest(postValidation),PostController.updatePostInto)

export const PostRoutes=router