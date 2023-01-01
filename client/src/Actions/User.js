const productionUrl = "https://social-hub-test.vercel.app"
const developmentUrl = 'http://localhost:5000'
const URL = productionUrl

// We use double arrow functions
export const loginUser = (email,password)=>async(dispatch)=>{
    try {
        dispatch({
            type:"LoginRequest"
        })
        const response = await fetch(`${URL}/api/v1/auth/login`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email":email,
                "password":password
            })
          });
        const data = await response.json()
        if(response.status >= 400){
            const obj = new Error(data.msg)
            obj.statusCode = response.status
            throw obj
        }

        dispatch({
            type:"LoginSuccess",
            payload:data.user
        })
    } catch (error) {
        console.log(error.message,error.statusCode)
        dispatch({
            type:"LoginFailure",
            payload:error.message
        })
    }    
}
export const registerUser = (username,email,password,image)=>async(dispatch)=>{
    try {
        dispatch({
            type:"RegisterRequest"
        })
        const response = await fetch(`${URL}/api/v1/auth/register`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username":username,
                "email":email,
                "password":password,
                "profilePicture":image
            })
          });
        const data = await response.json()
        if(response.status >= 400){
            const obj = new Error(data.msg)
            obj.statusCode = response.status
            throw obj
        }
        dispatch({
            type:"RegisterSuccess",
            payload:data.user
        })
    } catch (error) {
        console.log(error.message,error.statusCode)
        dispatch({
            type:"RegisterFailure",
            payload:error.message
        })
    }    
}
export const logoutUser = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"LogoutUserRequest"
        })
        const response = await fetch(`${URL}/api/v1/auth/logout`, {
            method: 'GET',
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
            type:"LogoutUserSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.message,error.statusCode)
        dispatch({
            type:"LogoutUserFailure",
            payload:error.message
        })
    }    
}

export const deleteUser = (userId)=>async(dispatch)=>{
    try {
        dispatch({
            type:"DeleteUserRequest"
        })
        const response = await fetch(`${URL}/api/v1/users/${userId}`, {
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
            type:"DeleteUserSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.message,error.statusCode)
        dispatch({
            type:"DeleteUserFailure",
            payload:error.message
        })
    }    
}

export const updateUser = (userId,username,email,image)=>async(dispatch)=>{
    try {
        dispatch({
            type:"UpdateUserRequest"
        })
        const response = await fetch(`${URL}/api/v1/users/${userId}`, {
            method: 'PATCH',
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username":username,
                "email":email,
                "img":image,
            })
          });
        const data = await response.json()
        if(response.status >= 400){
            const obj = new Error(data.msg)
            obj.statusCode = response.status
            throw obj
        }

        dispatch({
            type:"UpdateUserSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.message,error.statusCode)
        dispatch({
            type:"UpdateUserFailure",
            payload:error.message
        })
    }    
}

// Not properly implemented on backend
export const updateUserPass = (userId,oldPass,newPass)=>async(dispatch)=>{
    try {
        dispatch({
            type:"UpdateUserRequest"
        })
        const response = await fetch(`${URL}/api/v1/users/${userId}`, {
            method: 'PATCH',
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "oldPassword":oldPass,
                "newPassword":newPass,
            })
          });
        const data = await response.json()
        if(response.status >= 400){
            const obj = new Error(data.msg)
            obj.statusCode = response.status
            throw obj
        }

        dispatch({
            type:"UpdateUserSuccess",
            payload:"Password Updated"
        })
    } catch (error) {
        console.log(error.message,error.statusCode)
        dispatch({
            type:"UpdateUserFailure",
            payload:error.message
        })
    }    
}
export const loadUser = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"LoadUserRequest"
        })
        const response = await fetch(`${URL}/api/v1/users/profile`, {
            method: 'GET',
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
            type:"LoadUserSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.message,error.statusCode)
        dispatch({
            type:"LoadUserFailure",
            payload:error.message
        })
    }    
}
export const getSingleUser = (id) =>async(dispatch)=>{
    try {
        dispatch({
            type:"selectUserRequest"
        })
        const response1 = await fetch(`${URL}/api/v1/users/${id}`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
          });
        const data1 = await response1.json()
        if(response1.status >= 400){
            const obj = new Error(data1.msg)
            obj.statusCode = response1.status
            throw obj
        }

        const response2 = await fetch(`${URL}/api/v1/posts/${id}/all`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
          });
        const data2 = await response2.json()
        if(response2.status >= 400){
            const obj = new Error(data2.msg)
            obj.statusCode = response2.status
            throw obj
        }

        data1.posts = data2
        dispatch({
            type:"selectUserSuccess",
            payload:data1
        })
    } catch (error) {
        console.log(error.message,error.statusCode)
        dispatch({
            type:"selectUserFailure",
            payload:error.message
        })
    }    
}
export const getFollowingPosts = ()=>async(dispatch) =>{
    try{
        dispatch({
            type:"followingPostsRequest"
        })
        const response = await fetch(`${URL}/api/v1/posts/following`, {
            method: 'GET',
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
            type:"followingPostsSuccess",
            payload:data
        })
    }catch(error){
        console.log(error.message,error.statusCode)
        dispatch({
            type:"followingPostsFailure",
            payload:error.message
        })
    }
}
export const getUserPosts = ()=>async(dispatch) =>{
    try{
        dispatch({
            type:"userPostsRequest"
        })
        const response = await fetch(`${URL}/api/v1/posts/user`, {
            method: 'GET',
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
            type:"userPostsSuccess",
            payload:data
        })
    }catch(error){
        console.log(error.message,error.statusCode)
        dispatch({
            type:"userPostsFailure",
            payload:error.message
        })
    }
}
export const getAllUsers = ()=>async(dispatch) =>{
    try{
        dispatch({
            type:"allUsersRequest"
        })
        const response = await fetch(`${URL}/api/v1/users/all`, {
            method: 'GET',
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
            type:"allUsersSuccess",
            payload:data
        })
    }catch(error){
        console.log(error.message,error.statusCode)
        dispatch({
            type:"allUsersFailure",
            payload:error.message
        })
    }
}
export const searchUser = (username)=>async(dispatch) =>{
    try{
        dispatch({
            type:"getUsersRequest"
        })
        const response = await fetch(`${URL}/api/v1/users/search/${username}`, {
            method: 'GET',
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
            type:"getUsersSuccess",
            payload:data
        })
    }catch(error){
        console.log(error.message,error.statusCode)
        dispatch({
            type:"getUsersFailure",
            payload:error.message
        })
    }
}
export const followUser = (id) =>async(dispatch)=>{
    try {
        dispatch({
            type:"selectUserRequest"
        })
        const response1 = await fetch(`${URL}/api/v1/users/${id}/follow`, {
            method: 'PATCH',
            mode: 'cors',
            credentials: 'include',
          });
        const data = await response1.json()
        if(response1.status >= 400){
            const obj = new Error(data.msg)
            obj.statusCode = response1.status
            throw obj
        }

        const response2 = await fetch(`${URL}/api/v1/posts/${id}/all`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
          });
        const data2 = await response2.json()
        if(response2.status >= 400){
            const obj = new Error(data2.msg)
            obj.statusCode = response2.status
            throw obj
        }
        
        data.user.posts = data2
        data.user.status = data.status
        dispatch({
            type:"selectUserSuccess",
            payload:data.user
        })
    } catch (error) {
        console.log(error.message,error.statusCode)
        dispatch({
            type:"selectUserFailure",
            payload:error.message
        })
    }    
}
export const unfollowUser = (id) =>async(dispatch)=>{
    try {
        dispatch({
            type:"selectUserRequest"
        })
        const response1 = await fetch(`${URL}/api/v1/users/${id}/unfollow`, {
            method: 'PATCH',
            mode: 'cors',
            credentials: 'include',
          });
        const data = await response1.json()
        if(response1.status >= 400){
            const obj = new Error(data.msg)
            obj.statusCode = response1.status
            throw obj
        }

        const response2 = await fetch(`${URL}/api/v1/posts/${id}/all`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
          });
        const data2 = await response2.json()
        if(response2.status >= 400){
            const obj = new Error(data2.msg)
            obj.statusCode = response2.status
            throw obj
        }

        data.user.posts = data2
        data.user.status = data.status
        dispatch({
            type:"selectUserSuccess",
            payload:data.user
        })
    } catch (error) {
        console.log(error.message,error.statusCode)
        dispatch({
            type:"selectUserFailure",
            payload:error.message
        })
    }    
}