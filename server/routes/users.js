const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authentication')
const {updateUser,followUser,unfollowUser,deleteUser,getUser,
    getMyProfile,getAllUsers,searchUser} = require('../controllers/users')

router.route('/profile').get(authMiddleware,getMyProfile)
router.route('/all').get(authMiddleware,getAllUsers)
router.route('/search/:name').get(authMiddleware,searchUser)

router.route('/:id').patch(authMiddleware,updateUser)
    .delete(authMiddleware,deleteUser).get(authMiddleware,getUser)
    
router.route('/:id/follow').patch(authMiddleware,followUser)
router.route('/:id/unfollow').patch(authMiddleware,unfollowUser)

module.exports = router
