import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { commentValidation } from './comment.validation'
import { CommentController } from './comment.controller'

const router=express.Router()

router.post("/create-comment",validateRequest(commentValidation),CommentController.createCommentInto)
router.patch("/update-comment/:commentId",validateRequest(commentValidation),CommentController.updateCommentInto)
router.patch("/upvote/:commentId",CommentController.upvoteInto)
router.patch("/downvote/:commentId",CommentController.downvoteInto)

export const CommentRoutes=router