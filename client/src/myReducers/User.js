import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated:false,
}
export const userReducer = createReducer(initialState,{
    
    // dispatch types or cases for reducer
    LoginRequest: (state,action)=>{
        state.loading = true;
    },
    LoginSuccess: (state,action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LoginFailure: (state,action)=>{
          state.loading = false;     
          state.error = action.payload
          state.isAuthenticated = false;
    },

    RegisterRequest: (state,action)=>{
        state.loading = true;
    },
    RegisterSuccess: (state,action)=>{
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true;
    },
    RegisterFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
        state.isAuthenticated = false;
    },

    LoadUserRequest: (state,action)=>{
        state.loading = true;
    },
    LoadUserSuccess: (state,action)=>{
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true;
    },
    LoadUserFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
        state.isAuthenticated = false;
    },
    UpdateUserRequest: (state,action)=>{
        state.loading = true;
    },
    UpdateUserSuccess: (state,action)=>{
        state.loading = false
        state.message = action.payload
        state.isAuthenticated = true;
    },
    UpdateUserFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
        state.isAuthenticated = true;
    },
    LogoutUserRequest: (state,action)=>{
        state.loading = true;
    },
    LogoutUserSuccess: (state,action)=>{
        state.loading = false
        state.user = null
        state.isAuthenticated = false;
    },
    LogoutUserFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
        state.isAuthenticated = true;
    },
    DeleteUserRequest: (state,action)=>{
        state.loading = true;
    },
    DeleteUserSuccess: (state,action)=>{
        state.loading = false
        state.user = null
        state.message = "Account Deleted"
        state.isAuthenticated = false;
    },
    DeleteUserFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
        state.isAuthenticated = true;
    },
    clearErrors:(state,action)=>{
        state.error = null
        state.message = null
    }
})

export const followingPostsReducer = createReducer(initialState,{
    followingPostsRequest:(state,action)=>{
        state.loading = true
    },
    followingPostsSuccess:(state,action)=>{
        state.loading = false
        state.posts = action.payload
    },
    followingPostsFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    clearErrors:(state,action)=>{
        state.error = null
    }
})
export const userPostsReducer = createReducer(initialState,{
    userPostsRequest:(state,action)=>{
        state.loading = true
    },
    userPostsSuccess:(state,action)=>{
        state.loading = false
        state.posts = action.payload
    },
    userPostsFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    clearErrors:(state,action)=>{
        state.error = null
    }
})

export const allUsersReducer = createReducer(initialState,{
    allUsersRequest:(state,action)=>{
        state.loading = true
    },
    allUsersSuccess:(state,action)=>{
        state.loading = false
        state.users = action.payload
    },
    allUsersFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    getUsersRequest:(state,action)=>{
        state.loading = true
    },
    getUsersSuccess:(state,action)=>{
        state.loading = false
        state.users = action.payload
    },
    getUsersFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    clearErrors:(state,action)=>{
        state.error = null
    }
})

export const selectedUserReducer = createReducer(initialState,{
    selectUserRequest:(state,action)=>{
        state.loading = true
    },
    selectUserSuccess:(state,action)=>{
        state.loading = false
        state.selected_user = action.payload
    },
    selectUserFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    clearUser:(state,action)=>{
        state.selected_user = null
    },
    clearErrors:(state,action)=>{
        state.error = null
    }
})
