import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { postValidation } from './post.validation'
import { PostController } from './post.controller'
import { upload } from '../../config/multer.config'
import parseData from '../../middlewares/parseData'
const router=express.Router()

router.post("/create-post",upload.array("images"),parseData, validateRequest(postValidation),PostController.createPostInto)
router.get("/single-post/:postId",PostController.getSinglePost)
router.get("/",PostController.getAllPosts)
router.patch("/update-post/:postId",validateRequest(postValidation),PostController.updatePostInto)
router.patch("/upvote/:postId",PostController.upvoteInto)
router.patch("/downvote/:postId",PostController.downvoteInto)

export const PostRoutes=router