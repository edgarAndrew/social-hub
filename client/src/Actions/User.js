import axios from "axios"
import '../axios'

// We use double arrow functions
export const loginUser = (email,password)=>async(dispatch)=>{
    try {
        dispatch({
            type:"LoginRequest"
        })
        const {data} = await axios.post("/api/v1/auth/login",{email,password},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"LoginSuccess",
            payload:data.user
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"LoginFailure",
            payload:error.response.data
        })
    }    
}
export const registerUser = (username,email,password,image)=>async(dispatch)=>{
    try {
        dispatch({
            type:"RegisterRequest"
        })
        const {data} = await axios.post("/api/v1/auth/register",{username,email,password,profilePicture:image},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"RegisterSuccess",
            payload:data.user
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"RegisterFailure",
            payload:error.response.data
        })
    }    
}
export const logoutUser = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"LogoutUserRequest"
        })
        const {data} = await axios.get("/api/v1/auth/logout")
        dispatch({
            type:"LogoutUserSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"LogoutUserFailure",
            payload:error.response.data
        })
    }    
}

export const deleteUser = (userId)=>async(dispatch)=>{
    try {
        dispatch({
            type:"DeleteUserRequest"
        })
        const {data} = await axios.delete(`/api/v1/users/${userId}`)
        dispatch({
            type:"DeleteUserSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"DeleteUserFailure",
            payload:error.response.data
        })
    }    
}

export const updateUser = (userId,username,email,image)=>async(dispatch)=>{
    try {
        dispatch({
            type:"UpdateUserRequest"
        })
        const {data} = await axios.patch(`/api/v1/users/${userId}`,
        {username:username,email:email,img:image},{
            headers:{
                "Content-Type":"application/json"
            }
        }
        )
        dispatch({
            type:"UpdateUserSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"UpdateUserFailure",
            payload:error.response.data
        })
    }    
}
export const updateUserPass = (userId,oldPass,newPass)=>async(dispatch)=>{
    try {
        dispatch({
            type:"likeRequest"
        })
        const {data} = await axios.patch(`/api/v1/users/${userId}`,
        {oldPassword:oldPass,newPassword:newPass},{
            headers:{
                "Content-Type":"application/json"
            }
        }
        )
        dispatch({
            type:"likeSuccess",
            payload:"Password Updated"
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"likeFailure",
            payload:error.response.data
        })
    }    
}
export const loadUser = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"LoadUserRequest"
        })
        const {data} = await axios.get("/api/v1/users/profile")
        dispatch({
            type:"LoadUserSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"LoadUserFailure",
            payload:error.response.data
        })
    }    
}
export const getSingleUser = (id) =>async(dispatch)=>{
    try {
        dispatch({
            type:"selectUserRequest"
        })
        const {data:data1} = await axios.get(`/api/v1/users/${id}`)
        const {data:data2} = await axios.get(`/api/v1/posts/${id}/all`)
        data1.posts = data2
        dispatch({
            type:"selectUserSuccess",
            payload:data1
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"selectUserFailure",
            payload:error.response.data
        })
    }    
}
export const getFollowingPosts = ()=>async(dispatch) =>{
    try{
        dispatch({
            type:"followingPostsRequest"
        })
        const {data} = await axios.get("/api/v1/posts/following")
        dispatch({
            type:"followingPostsSuccess",
            payload:data
        })
    }catch(error){
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"followingPostsFailure",
            payload:error.response.data
        })
    }
}
export const getUserPosts = ()=>async(dispatch) =>{
    try{
        dispatch({
            type:"userPostsRequest"
        })
        const {data} = await axios.get("/api/v1/posts/user")
        dispatch({
            type:"userPostsSuccess",
            payload:data
        })
    }catch(error){
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"userPostsFailure",
            payload:error.response.data
        })
    }
}
export const getAllUsers = ()=>async(dispatch) =>{
    try{
        dispatch({
            type:"allUsersRequest"
        })
        const {data} = await axios.get("/api/v1/users/all")
        dispatch({
            type:"allUsersSuccess",
            payload:data
        })
    }catch(error){
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"allUsersFailure",
            payload:error.response.data
        })
    }
}
export const searchUser = (username)=>async(dispatch) =>{
    try{
        dispatch({
            type:"getUsersRequest"
        })
        const {data} = await axios.get(`/api/v1/users/search/${username}`);
        dispatch({
            type:"getUsersSuccess",
            payload:data
        })
    }catch(error){
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"getUsersFailure",
            payload:error.response.data
        })
    }
}
export const followUser = (id) =>async(dispatch)=>{
    try {
        dispatch({
            type:"selectUserRequest"
        })
        const {data} = await axios.patch(`/api/v1/users/${id}/follow`)
        const {data:data2} = await axios.get(`/api/v1/posts/${id}/all`)
        data.user.posts = data2
        data.user.status = data.status
        dispatch({
            type:"selectUserSuccess",
            payload:data.user
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"selectUserFailure",
            payload:error.response.data
        })
    }    
}
export const unfollowUser = (id) =>async(dispatch)=>{
    try {
        dispatch({
            type:"selectUserRequest"
        })
        const {data} = await axios.patch(`/api/v1/users/${id}/unfollow`)
        const {data:data2} = await axios.get(`/api/v1/posts/${id}/all`)
        data.user.posts = data2
        data.user.status = data.status
        dispatch({
            type:"selectUserSuccess",
            payload:data.user
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"selectUserFailure",
            payload:error.response.data
        })
    }    
}