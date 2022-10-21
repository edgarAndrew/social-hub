import axios from 'axios'
import '../axios'
export const likePost = (postId)=>async(dispatch)=>{
    try {
        dispatch({
            type:"likeRequest"
        })
        const {data} = await axios.patch(`/api/v1/posts/${postId}/like`)
        dispatch({
            type:"likeSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"likeFailure",
            payload:error.response.data
        })
    }    
}
export const unlikePost = (postId)=>async(dispatch)=>{
    try {
        dispatch({
            type:"unlikeRequest"
        })
        const {data} = await axios.patch(`/api/v1/posts/${postId}/unlike`)
        dispatch({
            type:"unlikeSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"unlikeFailure",
            payload:error.response.data
        })
    }    
}
export const commentPost = (postId,comment)=>async(dispatch)=>{
    try {
        dispatch({
            type:"commentRequest"
        })
        const {data} = await axios.post(`/api/v1/posts/${postId}/comment`,{comment},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"commentSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"commentFailure",
            payload:error.response.data
        })
    }    
}
export const uncommentPost = (postId,comment)=>async(dispatch)=>{
    try {
        dispatch({
            type:"uncommentRequest"
        })
        const {data} = await axios.delete(`/api/v1/posts/${postId}/comment`,{data:{comment:comment}},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"uncommentSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"uncommentFailure",
            payload:error.response.data
        })
    }    
}
export const uploadPost = (caption,image)=>async(dispatch)=>{
    try {
        dispatch({
            type:"uploadPostRequest"
        })
        const {data} = await axios.post(`/api/v1/posts/`,
        {desc:caption,img:image},
        {
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"uploadPostSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"uploadPostFailure",
            payload:error.response.data
        })
    }    
}
export const updatePost = (caption,postId)=>async(dispatch)=>{
    try {
        dispatch({
            type:"updateRequest"
        })
        const {data} = await axios.patch(`/api/v1/posts/${postId}`,{desc:caption},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"updateSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"updateFailure",
            payload:error.response.data
        })
    }    
}
export const deletePost = (postId)=>async(dispatch)=>{
    try {
        dispatch({
            type:"deleteRequest"
        })
        const {data} = await axios.delete(`/api/v1/posts/${postId}`)
        dispatch({
            type:"deleteSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"deleteFailure",
            payload:error.response.data
        })
    }    
}