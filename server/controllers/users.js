const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {ForbiddenRequestError,UnauthenticatedError} = require('../errors/index')
const cloudinary = require('cloudinary')
const bcrypt = require('bcrypt')
const Posts = require('../models/Posts')

const getUser = async (req,res)=>{
    const user = await User.findById(req.params.id);
    const {password,updatedAt,...other} = user._doc
    res.status(StatusCodes.OK).json(other)
}

const updateUser = async(req,res)=>{
    const {userId,isAdmin} = req.user;
    const {id} = req.params;
    const {img} = req.body

    if(userId == id || isAdmin){
        if(req.body.oldPassword && req.body.newPassword){
            const user = await User.findById(userId)
            const passCorrect = await user.comparePassword(req.body.oldPassword);
            if(!passCorrect)
                throw new UnauthenticatedError('Wrong password entered')
            const salt = await bcrypt.genSalt(10)
            const new_password = await bcrypt.hash(req.body.newPassword,salt)
            req.body.password = new_password
            delete req.body.oldPassword;
            delete req.body.newPassword
        }
        if(img){
            const user = await User.findById(userId);
            const {publicId} = user
            publicId ? await cloudinary.v2.uploader.destroy(publicId) : null
            const myCloud = await cloudinary.v2.uploader.upload(img,{
                folder:"users"
            })
            req.body.profilePicture = myCloud.secure_url
            req.body.publicId = myCloud.public_id
        }
        const user = await User.findByIdAndUpdate(id,{ $set:req.body })
        const {password,updatedAt,...other} = user._doc
        res.status(StatusCodes.OK).json(other)
    }else
        throw new UnauthenticatedError(`You do not have access to user id:${id}`)
}

const deleteUser = async(req,res)=>{
    const {userId,isAdmin} = req.user;
    const {id} = req.params;
    if(userId == id || isAdmin){
        const {_doc} = await User.findById(userId)

        // updating followers and following
        _doc.followers.map(async id=>{
            const temp = await User.findById(id)
            const {following,_id} = temp._doc
            const arr1 = following.filter(e => e !== userId)
            await User.findByIdAndUpdate(_id,{ following: arr1})
        })
        _doc.following.map(async id=>{
            const temp = await User.findById(id)
            const {followers,_id} = temp._doc
            const arr2 = followers.filter(e => e !== userId)
            await User.findByIdAndUpdate(_id,{ followers:arr2})
        })
        // Deleting all posts made by user
        const posts = await Posts.find({})
        posts.map(async post=>{
            if(post.userId === userId){
                await Posts.findByIdAndDelete(post._id)
                post.publicId ? await cloudinary.v2.uploader.destroy(post.publicId) : null
            }
        })
        // Deleting user
        const user = await User.findByIdAndDelete(id)
        // Deleting posts from cloud
        const {publicId} = user
        publicId ? await cloudinary.v2.uploader.destroy(publicId) : null
        res.status(StatusCodes.OK).json({code:StatusCodes.OK,msg:"Account Deleted"})
    }else
        throw new UnauthenticatedError(`You do not have access to user id:${id}`)
    
}
const followUser = async(req,res)=>{
    const cur_user = req.user.userId;
    const user = req.params.id;
    const us1 = await User.findById(cur_user);
    const us2 = await User.findById(user);
    
    if(user !== cur_user){
        if(!us1.following.includes(user)){
            await User.findByIdAndUpdate(user,{$push:{followers:cur_user}})
            await User.findByIdAndUpdate(cur_user,{$push:{following:user}})
            const followed_user = await User.findById(user)
            res.status(200).json({code:200,msg:`You have followed user with id ${user}`,status:`You followed ${followed_user.username}`,user:followed_user})
        }else
            throw new ForbiddenRequestError(`You already follow user with id ${user}`)
    }else
        throw new ForbiddenRequestError('You cannot follow yourself') 
}
const unfollowUser = async(req,res)=>{
    const cur_user = req.user.userId;
    const user = req.params.id;
    const us1 = await User.findById(cur_user);
    const us2 = await User.findById(user);
    
    if(user !== cur_user){
        if(us1.following.includes(user)){
            await User.findByIdAndUpdate(user,{$pull:{followers:cur_user}})
            await User.findByIdAndUpdate(cur_user,{$pull:{following:user}})
            const unfollowed_user = await User.findById(user)
            res.status(200).json({code:200,msg:`You have unfollowed user with id ${user}`,status:`You unfollowed ${unfollowed_user.username}`,user:unfollowed_user})
        }else
            throw new ForbiddenRequestError(`You do not follow user with id ${user}`)
    }else
        throw new ForbiddenRequestError("You cannot follow/unfollow yourself")
}
const getMyProfile = async(req,res)=>{
    const {userId} = req.user;
    const user = await User.findById(userId);
    const {password,updatedAt,...other} = user._doc
    res.status(StatusCodes.OK).json(other)
}
const searchUser = async(req,res)=>{ // to find users with similar names
    const {name} = req.params
    console.log(req.params)
    const temp = String(name)
    const users = await User.find( { 'username' : { '$regex' : temp, '$options' : 'i' } } )
    res.status(StatusCodes.OK).json({users})
}
const getAllUsers = async(req,res)=>{
    const users = await User.find({})
    res.status(StatusCodes.OK).json({users})
}
module.exports = {getUser,updateUser,deleteUser,followUser,unfollowUser,getMyProfile,getAllUsers
    ,searchUser}