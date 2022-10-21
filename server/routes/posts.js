const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authentication')

const {createPost,updatePost,likePost,unlikePost,getFollowingPosts,getUserPosts,
    deletePost,getAllPosts,getSinglePost,commentPost,uncommentPost} = require('../controllers/posts')

router.route('/').post(authMiddleware,createPost)
router.route('/following').get(authMiddleware,getFollowingPosts)
router.route('/user').get(authMiddleware,getUserPosts)
router.route('/:id').get(authMiddleware,getSinglePost).patch(authMiddleware,updatePost)
            .delete(authMiddleware,deletePost)
router.route('/:id/all').get(authMiddleware,getAllPosts)
router.route('/:id/like').patch(authMiddleware,likePost)
router.route('/:id/unlike').patch(authMiddleware,unlikePost)
router.route('/:id/comment').post(authMiddleware,commentPost)
router.route('/:id/comment').delete(authMiddleware,uncommentPost)

module.exports = router;