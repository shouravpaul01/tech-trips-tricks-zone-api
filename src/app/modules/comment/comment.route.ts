import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import {  createCommentValidation, updateCommentValidation } from './comment.validation'
import { CommentController } from './comment.controller'

const router=express.Router()

router.post("/create-comment",validateRequest(createCommentValidation),CommentController.createCommentInto)
router.patch("/update-comment/:commentId",validateRequest(updateCommentValidation),CommentController.updateCommentInto)
router.delete("/delete-comment/:commentId",CommentController.deleteComment)
router.patch("/upvote/:commentId",CommentController.upvoteInto)
router.patch("/downvote/:commentId",CommentController.downvoteInto)

export const CommentRoutes=router