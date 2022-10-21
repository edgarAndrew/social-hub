import React from 'react'
import {Link} from 'react-router-dom'
import { Typography,Button} from '@mui/material'
import {Delete} from '@mui/icons-material'
import {useSelector,useDispatch} from 'react-redux'
import './Comments.css'
import {uncommentPost} from '../../Actions/Post'
import {getUserPosts,getFollowingPosts} from '../../Actions/User'

const Comments = ({
    data,postId,isAccount=false
}) => {
    const dispatch = useDispatch()
    
    const {user} = useSelector((state)=>state.user)
    const deleteComment = async()=>{
        dispatch(uncommentPost(postId,data.comment));
        isAccount?dispatch(getUserPosts()):dispatch(getFollowingPosts())
    }
    if(data){
        return (
            <div className='commentUser'>
                <Link to={`user/${data.userId}`}>
                    <img src={data.user.profilePicture} alt={data.user.username} />
                    <Typography 
                    style={{minWith:"6vmax",marginRight:"10px"}}>{data.user.username}</Typography>
                </Link>
                <Typography>{data.comment}</Typography>
                {
                    data.userId === user._id
                    ?<Button onClick={deleteComment}><Delete/></Button>
                    :null
                }
            </div>
          )
    }
    else
        return null
}

export default Comments