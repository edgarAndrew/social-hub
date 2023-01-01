const productionUrl = "https://social-hub-test.vercel.app"
const developmentUrl = 'http://localhost:5000'
const URL = productionUrl

export const likePost = (postId)=>async(dispatch)=>{
    try {
        dispatch({
            type:"likeRequest"
        })
        const response = await fetch(`${URL}/api/v1/posts/${postId}/like`, {
            method: 'PATCH',
            mode: 'cors',
            credentials: 'include',
          });

        const data = await response.json()
        if(response.status >= 400){
            const obj = new Error(data.msg)
            obj.statusCode = response.status
            throw obj
        }
        dispatch({
            type:"likeSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.message,error.statusCode)
        dispatch({
            type:"likeFailure",
            payload:error.message
        })
    }    
}
export const unlikePost = (postId)=>async(dispatch)=>{
    try {
        dispatch({
            type:"unlikeRequest"
        })
        const response = await fetch(`${URL}/api/v1/posts/${postId}/unlike`, {
            method: 'PATCH',
            mode: 'cors',
            credentials: 'include',
          });

        const data = await response.json()
        if(response.status >= 400){
            const obj = new Error(data.msg)
            obj.statusCode = response.status
            throw obj
        }

        dispatch({
            type:"unlikeSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.message,error.statusCode)
        dispatch({
            type:"unlikeFailure",
            payload:error.message
        })
    }    
}
export const commentPost = (postId,comment)=>async(dispatch)=>{
    try {
        dispatch({
            type:"commentRequest"
        })
        const response = await fetch(`${URL}/api/v1/posts/${postId}/comment`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "comment":comment
            })
          });
        const data = await response.json()
        if(response.status >= 400){
            const obj = new Error(data.msg)
            obj.statusCode = response.status
            throw obj
        }

        dispatch({
            type:"commentSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.message,error.statusCode)
        dispatch({
            type:"commentFailure",
            payload:error.message
        })
    }    
}
export const uncommentPost = (postId,comment)=>async(dispatch)=>{
    try {
        dispatch({
            type:"uncommentRequest"
        })
        const response = await fetch(`${URL}/api/v1/posts/${postId}/comment`, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment:comment
            })
          });
        const data = await response.json()
        if(response.status >= 400){
            const obj = new Error(data.msg)
            obj.statusCode = response.status
            throw obj
        }

        dispatch({
            type:"uncommentSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.message,error.statusCode)
        dispatch({
            type:"uncommentFailure",
            payload:error.message
        })
    }    
}
export const uploadPost = (caption,image)=>async(dispatch)=>{
    try {
        dispatch({
            type:"uploadPostRequest"
        })
        const response = await fetch(`${URL}/api/v1/posts/`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                desc:caption,img:image
            })
          });
        const data = await response.json()
        if(response.status >= 400){
            const obj = new Error(data.msg)
            obj.statusCode = response.status
            throw obj
        }

        dispatch({
            type:"uploadPostSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.message,error.statusCode)
        dispatch({
            type:"uploadPostFailure",
            payload:error.message
        })
    }    
}
export const updatePost = (caption,postId)=>async(dispatch)=>{
    try {
        dispatch({
            type:"updateRequest"
        })
        const response = await fetch(`${URL}/api/v1/posts/${postId}`, {
            method: 'PATCH',
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                desc:caption
            })
          });

        const data = await response.json()
        if(response.status >= 400){
            const obj = new Error(data.msg)
            obj.statusCode = response.status
            throw obj
        }

        dispatch({
            type:"updateSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.message,error.statusCode)
        dispatch({
            type:"updateFailure",
            payload:error.message
        })
    }    
}
export const deletePost = (postId)=>async(dispatch)=>{
    try {
        dispatch({
            type:"deleteRequest"
        })
        const response = await fetch(`${URL}/api/v1/posts/${postId}`, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
          });

        const data = await response.json()
        if(response.status >= 400){
            const obj = new Error(data.msg)
            obj.statusCode = response.status
            throw obj
        }
        dispatch({
            type:"deleteSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.message,error.statusCode)
        dispatch({
            type:"deleteFailure",
            payload:error.message
        })
    }    
}