import React,{useEffect} from 'react'
import "./Home.css"
import User from "../User/User"
import Post from "../Post/Post"
import Loader from "../Loader/Loader"
import { useDispatch,useSelector } from 'react-redux'
import {getFollowingPosts,getAllUsers,loadUser} from '../../Actions/User'
import { Typography } from '@mui/material'
import {useAlert} from 'react-alert'
import { useState } from 'react'

const Home = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  
  useEffect(()=>{
    dispatch(getFollowingPosts())
    dispatch(getAllUsers())
    dispatch(loadUser())
  },[dispatch])

  const [width,setWidth] = useState(window.innerWidth)

  const {message:msg1,error:likeErr} = useSelector((state)=>state.likePost)
  const {message:msg2,error:unlikeErr} = useSelector((state)=>state.unlikePost)
  const {message:msg3,error:commentErr} = useSelector((state)=>state.commentPost)
  const {posts:followingPosts,loading:postsLoading} = useSelector((state)=>state.followingPosts);
  const {user,loading:userLoading} = useSelector((state)=>state.user);
  const {users,loading:usersLoading} = useSelector((state)=>state.allUsers)

  window.addEventListener('resize',()=>{
    setWidth(window.innerWidth)
  })

  
  useEffect(()=>{
    // initially like& unlike reducers are empty
    // when we interact with it it will get initialized
    //but the hook is to be initialized only once and not for every post

    if(likeErr){
        alert.error(likeErr)
        dispatch({type:"clearErrors"})
    }
    if(commentErr){
      alert.error(commentErr)
      dispatch({type:"clearErrors"})
    }
    if(unlikeErr){
        alert.error(unlikeErr)
        dispatch({type:"clearErrors"})
    }
    if(msg1){
        alert.success(msg1.status)
        dispatch({type:"clearMessage"})
    }
    if(msg2){
        alert.success(msg2.status)
        dispatch({type:"clearMessage"})
    }
    if(msg3){
      alert.success(msg3.msg)
      dispatch({type:"clearMessage"})
    }

  },[dispatch,alert,msg1,msg2,msg3,likeErr,unlikeErr,commentErr])
  
  return (postsLoading || userLoading || usersLoading? <Loader/>: (
    <div className='home'>
        <div className='homeleft'>
          {
            followingPosts && followingPosts.length>0?
            followingPosts.map((ele)=>{
            return (<Post key={ele._id} postId={ele._id} postImage={ele.img}
              likes={ele.likes} comments={ele.comments} userImage={ele.avatar} caption={ele.desc}
              userName={ele.userName} userId={ele.userId}/>)
          }):
          <Typography variant='h6'>Your followings have no posts</Typography>
          }
        </div>
        {width>600 ? 
        <div className='homeright'>
        {
            users && users.users.length>0?
            users.users.map((ele)=>{
            return ele._id !== user._id ?
              <User key={ele._id} userId={ele._id} name={ele.username} pic={ele.profilePicture}/>:null
          }): null 
          }
        </div>
        :null}
        
    </div>
  ))
}

export default Home