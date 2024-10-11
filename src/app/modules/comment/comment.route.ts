import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { commentValidation } from './comment.validation'
import { CommentController } from './comment.controller'

const router=express.Router()

router.post("/create-comment",validateRequest(commentValidation),CommentController.createCommentInto)
router.patch("/update-comment/:commentId",validateRequest(commentValidation),CommentController.updateCommentInto)

export const CommentRoutes=router