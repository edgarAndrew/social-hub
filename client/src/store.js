import {configureStore} from "@reduxjs/toolkit"
import {userReducer,followingPostsReducer,allUsersReducer,
    userPostsReducer,selectedUserReducer} from './myReducers/User'

import {likeReducer,unlikeReducer,commentReducer,uploadReducer} from './myReducers/Posts'

const store = configureStore({
    reducer:{
        user:userReducer,
        select_user:selectedUserReducer,
        followingPosts:followingPostsReducer,
        userPosts:userPostsReducer,
        allUsers:allUsersReducer,
        likePost:likeReducer,
        unlikePost:unlikeReducer,
        commentPost:commentReducer,
        uploadPost:uploadReducer
    }
})

export default store;