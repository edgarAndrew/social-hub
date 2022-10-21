import {createReducer} from "@reduxjs/toolkit"

const initialState = {}

export const likeReducer = createReducer(initialState,{
    likeRequest:(state,action)=>{
        state.loading = true
    },
    likeSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    likeFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    clearErrors:(state,action)=>{
        state.error = null
    },
    clearMessage:(state,action)=>{
        state.message = null
    }
})
export const unlikeReducer = createReducer(initialState,{
    unlikeRequest:(state,action)=>{
        state.loading = true
    },
    unlikeSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    unlikeFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    clearErrors:(state,action)=>{
        state.error = null
    },
    clearMessage:(state,action)=>{
        state.message = null
    }
})
export const commentReducer = createReducer(initialState,{
    commentRequest:(state,action)=>{
        state.loading = true
    },
    commentSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    commentFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    uncommentRequest:(state,action)=>{
        state.loading = true
    },
    uncommentSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    uncommentFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    clearErrors:(state,action)=>{
        state.error = null
    },
    clearMessage:(state,action)=>{
        state.message = null
    },
    updateRequest:(state,action)=>{
        state.loading = true
    },
    updateSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    updateFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    deleteRequest:(state,action)=>{
        state.loading = true
    },
    deleteSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    deleteFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
})
export const uploadReducer = createReducer(initialState,{
    uploadPostRequest:(state,action)=>{
        state.loading = true
    },
    uploadPostSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    uploadPostFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    clearErrors:(state,action)=>{
        state.error = null
    },
    clearMessage:(state,action)=>{
        state.message = null
    }
})
