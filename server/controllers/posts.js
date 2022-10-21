const Post = require('../models/Posts')
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const cloudinary = require('cloudinary')
const {BadRequestError,UnauthenticatedError} = require('../errors/index')

const createPost = async(req,res)=>{
    const {userId,username} = req.user;
    const user = await User.findById(userId)
    const {img} = req.body
    
    if(img){   
        const myCloud = await cloudinary.v2.uploader.upload(img,{
            folder:"posts"
        })
        req.body.img = myCloud.secure_url
        req.body.publicId = myCloud.public_id
    }
    req.body.userId = userId;
    req.body.userName = username;
    req.body.avatar = user.profilePicture;
    const post = await Post.create(req.body)
    res.status(200).json({post,status:'Post uploaded'})
}
const updatePost = async(req,res)=>{
    const {userId,isAdmin} = req.user;
    const {id} = req.params;
    const post = await Post.findById(id)
    if(post.userId == userId || isAdmin){
        await Post.findByIdAndUpdate(id,{
            $set:req.body,
        })
        res.status(StatusCodes.OK).json({msg:"Post updated"})
    }else
        throw new UnauthenticatedError('You can only update your own post')
}
const deletePost = async(req,res)=>{
    const {userId,isAdmin} = req.user;
    const {id} = req.params;
    const post = await Post.findById(id)
    const {publicId} = post
    if(post.userId == userId || isAdmin){
        await Post.findByIdAndDelete(id)
        publicId ? await cloudinary.v2.uploader.destroy(publicId) : null
        res.status(StatusCodes.OK).json({msg:"Post Deleted"})
    }else
        throw new UnauthenticatedError('You can only delete your own post')
}
const likePost = async(req,res)=>{
    const {id} = req.params
    const {userId} = req.user
    const post = await Post.findById(id)
    if(!post.likes.includes(userId)){
        await Post.findByIdAndUpdate(id,{ $push:{likes:userId} })
        res.status(StatusCodes.OK).json({msg:`The post has been liked by user ${userId}`,status:'POST LIKED'})
    }
    else
        throw new BadRequestError('You have already liked the post')
}
const unlikePost = async(req,res)=>{
    const {id} = req.params
    const {userId} = req.user
    const post = await Post.findById(id)
    if(post.likes.includes(userId)){
        await Post.findByIdAndUpdate(id,{ $pull:{likes:userId} })
        res.status(StatusCodes.OK).json({msg:`The post has been unliked by user ${userId}`,status:'POST UNLIKED'})
    }
    else
        throw new BadRequestError('You have not liked the post')
}
const getSinglePost = async(req,res)=>{
    const {id} = req.params
    const post = await Post.findById(id)
    res.status(StatusCodes.OK).json({post})
}

const getFollowingPosts = async(req,res)=>{
    const {userId} = req.user
    const user = await User.findById(userId)
    const friendPosts = await Promise.all(
        user.following.map((id)=>{
            return Post.find({userId:id})
        })
    )
    res.status(StatusCodes.OK).json([].concat(...friendPosts).reverse())
}
const getUserPosts = async(req,res)=>{
    const {userId} = req.user
    const user = await User.findById(userId)
    const userPosts = await Post.find({userId:user._id})
    res.status(StatusCodes.OK).json([].concat(...userPosts).reverse())
}
const getAllPosts = async(req,res)=>{
    const {id} = req.params
    const posts = await Post.find({userId:id})
    res.status(StatusCodes.OK).json([].concat(...posts).reverse())
}

// const getAllPosts = async(req,res)=>{
//     const {isAdmin} = req.user
//     if(isAdmin){
//         const posts = await Post.find({})
//         res.status(StatusCodes.OK).json({posts})
//     }else
//         throw new BadRequestError('Only Admin can request for all posts')
// }

const commentPost = async(req,res)=>{
    const {id} = req.params
    const {userId} = req.user
    const {comment} = req.body
    if(!comment)
        throw new BadRequestError('Comment must be provided')
    const user = await User.findById(userId);
    const {password,updatedAt,createdAt,isAdmin,following,followers,coverPicture,
        email,...other} = user._doc
    
    const post = await Post.findByIdAndUpdate(id,{
        $push:{comments:{userId:userId,comment:comment,user:other}}
    })
    res.status(StatusCodes.OK).json({msg:`Commented on post`})
}

const uncommentPost = async(req,res)=>{
    const {id} = req.params
    const {userId} = req.user
    const {comment} = req.body
    if(!comment)
        throw new BadRequestError('Comment must be provided')
    const post = await Post.findByIdAndUpdate(id,{
        $pull:{comments:{userId:userId,comment:comment}}
    })
    res.status(StatusCodes.OK).json({msg:'Comment deleted'})
}

module.exports = {createPost,updatePost,deletePost,likePost,unlikePost,getSinglePost,
    getAllPosts,commentPost,uncommentPost,getFollowingPosts,getUserPosts}