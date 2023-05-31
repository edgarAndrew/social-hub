import React,{useEffect,useState} from 'react'
import "./Profile.css"
import Post from "../Post/Post"
import User from "../User/User"
import Loader from "../Loader/Loader"
import { useDispatch,useSelector } from 'react-redux'
import { useParams ,Link,useNavigate} from 'react-router-dom'
import {getUserPosts,getAllUsers,getSingleUser,followUser,unfollowUser,
  loadUser,logoutUser,deleteUser} from '../../Actions/User'
import { Avatar, Typography,Button,Dialog} from '@mui/material'
import {Settings} from '@mui/icons-material'
import {useAlert} from 'react-alert'

const Profile = ({
      isAccount = false,
    }) => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  const params = useParams();
  const [followingBox,setFollowingBox] = useState(false)
  const [followersBox,setFollowersBox] = useState(false)
  const [settingsBox,setSettingsBox] = useState(false)
 
  useEffect(()=>{
    isAccount?dispatch(getUserPosts()):dispatch(getSingleUser(params.id));
    dispatch(getAllUsers())
  },[dispatch])

  const {selected_user,loading:load2} = useSelector((state)=>state.select_user)
  const {message:msg1,error:likeErr} = useSelector((state)=>state.likePost)
  const {message:msg2,error:unlikeErr} = useSelector((state)=>state.unlikePost)
  const {message:msg3,loading:load3} = useSelector((state)=>state.commentPost)
  const msg4 = selected_user !== undefined ? selected_user.status : null;
  const {posts:userPosts,loading:load1} = useSelector((state)=>state.userPosts);

  const {user,error,loading:load4} = useSelector((state)=>state.user);
  const {users} = useSelector((state)=>state.allUsers)

  if(isAccount === false)
    isAccount = isAccount = params.id === user._id?true:false

  useEffect(()=>{
    if(likeErr){
        alert.error(likeErr)
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
    }if(msg3){
      alert.success(msg3.msg)
      dispatch({type:"clearMessage"})
    }
    if(msg4){
      alert.success(msg4)
      //dispatch({type:"clearUser"})
    }
  },[dispatch,alert,msg1,msg2,msg3,msg4,likeErr,unlikeErr])

  const handleFollow = async() =>{
    await dispatch(followUser(selected_user._id))
    await dispatch(getSingleUser(params.id))
    await dispatch(loadUser())
  }
  const handleUnfollow = async()=>{
    await dispatch(unfollowUser(selected_user._id))
    await dispatch(getSingleUser(params.id))
    await dispatch(loadUser())
  }
  const handleLogout = async()=>{
    await dispatch(logoutUser());
    //window.location.pathname = "/"
    dispatch({type:"clearErrors"})
  }
  const handleDelete = async()=>{
    await dispatch(deleteUser(user._id))
    navigate('/')
  }
  
  return isAccount 
    ?(load1 || load3? <Loader/>: (
      userPosts && user?     
      <div className='profile'>
        <div className='profiletop'>
          <div className='bio'>
            <div>
              <Avatar src={user.profilePicture}
                sx={{height:"10vmax",width:"10vmax"}}
              />
              <div style={
                {display:"flex",flexDirection:"row"
                ,alignItems:"center",marginTop:"2vmax"}
                }>
                <Typography variant="h5">{user?.username}</Typography>
                <Settings style={{cursor:"pointer"}} onClick={()=>setSettingsBox(!settingsBox)}/>
              </div>
            </div>
            
            <div>
              <button onClick={()=>setFollowersBox(!followersBox)}>
                <Typography>Followers</Typography>
              </button>
                <Typography>{user?.followers.length}</Typography>
            </div>
            <div>
              <button onClick={()=>setFollowingBox(!followingBox)}>
                <Typography>Followings</Typography>
              </button>
                <Typography>{user?.following.length}</Typography>
            </div>
            <div>
              <Typography>Posts</Typography>
              <Typography>{userPosts.length}</Typography>
            </div>
            <div>
              
            </div>
            
          </div>
          
          <Dialog open={followersBox} onClose={()=>setFollowersBox(!followersBox)}>
            <div className='DialogBox'>
                <Typography variant='h4' style={{margin:"2vmax"}}>Followers</Typography>
                {
                    user.followers.length===0
                    ?<Typography>No Followers yet</Typography>
                    :users && users.users.length>0?
                    users.users.map((ele)=>{
                    return user.followers.includes(ele._id) ?
                      <User key={ele._id} userId={ele._id} name={ele.username} pic={ele.profilePicture} dialog={setFollowersBox}/>:null
                  }):null
                }
            </div>
        </Dialog>
          
          
          <Dialog open={followingBox} onClose={()=>setFollowingBox(!followingBox)}>
            <div className='DialogBox'>
                <Typography variant='h4'>Followings</Typography>
                {
                    user?.following.length===0
                    ?<Typography style={{margin:"2vmax"}}>No Following yet</Typography>
                    :users && users.users.length>0?
                    users.users.map((ele)=>{
                    return user.following.includes(ele._id) ?
                      <User key={ele._id} userId={ele._id} name={ele.username} pic={ele.profilePicture} dialog={setFollowingBox}/>:null
                  }):null
                }
            </div>
        </Dialog>
        <Dialog open={settingsBox} onClose={()=>setSettingsBox(!settingsBox)}>
            <div className='DialogBox'>
                <Typography variant='h4' style={{margin:"2vmax"}}>Settings</Typography>
                <div className='settings'>
                  <Button variant="contained" onClick={handleLogout}>Logout</Button>
                  <Link to="/update/profile">Edit Profile</Link>
                  <Link to="/update/password">Change Password</Link>
                  <Button variant="text"
                    style={{color:"red",margin:"2vmax"}}
                    onClick={handleDelete}>
                    Delete Profile
                  </Button>
                </div>
            </div>
        </Dialog>
      </div>
      <div className='profileBottom'>
        <div className='profileleft'>
          {
            userPosts
            ?userPosts.length>0
              ?userPosts.map((ele)=>{
              return( 
                <Post key={ele._id} postId={ele._id} postImage={ele.img}
                likes={ele.likes} comments={ele.comments} userImage={user.profilePicture} caption={ele.desc}
                userName={user?.username} userId={ele.userId} isAccount={true}/>
              )
              }):
          <Typography variant='h6'>You have no posts</Typography>
          :null  
          }
          </div>
      </div>
      
  </div>:null
  ))
  :(load2?<Loader/>:(
    selected_user?
    <div className='profile'>
        <div className='profiletop'>
          <div className='bio'>
            <div>
              <Avatar src={selected_user.profilePicture}
              sx={{height:"10vmax",width:"10vmax"}}
              />
              <div style={
                {display:"flex",flexDirection:"row"
                ,alignItems:"center",marginTop:"2vmax"}
                }>
                <Typography variant="h5">{selected_user.username}</Typography>
              </div>
            </div>
              <div>
            <button onClick={()=>setFollowingBox(!followingBox)}>
              <Typography>Following</Typography>
            </button>
              <Typography>{selected_user.following.length}</Typography>
          </div>
          
          <div>
            <button onClick={()=>setFollowersBox(!followersBox)}>
              <Typography>Followers</Typography>
            </button>
              <Typography>{selected_user.followers.length}</Typography>
          </div>
          
          <div>
              <Typography>Posts</Typography>
              <Typography>{selected_user.posts.length}</Typography>
          </div>
          </div>
          
          {
            user.following.includes(selected_user._id)
            ?<Button variant="contained" style={{backgroundColor:"red",marginTop:"20px"}} onClick={handleUnfollow}>Unfollow</Button>
            :<Button variant="contained" style={{marginTop:"20px"}} onClick={handleFollow}>Follow</Button>
          }
        </div>
        <div className='profileBottom'>
          <div className='profileleft'>
            {
              selected_user && selected_user.posts.length>0?
              selected_user.posts.map((ele)=>{
              return( 
                <Post key={ele._id} postId={ele._id} postImage={ele.img}
                  likes={ele.likes} comments={ele.comments} userImage={ele.avatar} caption={ele.desc}
                  userName={ele.userName} userId={ele.userId} isAccount={false}/>
              )
            }):
            <Typography variant='h6'>User has no posts</Typography>
            }
          </div>
        </div>
        
        <Dialog open={followingBox} onClose={()=>setFollowingBox(!followingBox)}>
            <div className='DialogBox'>
                <Typography variant='h4'>Followings</Typography>
                {
                    selected_user.following.length===0
                    ?<Typography style={{margin:"2vmax"}}>No Following yet</Typography>
                    :users && users.users.length>0?
                    users.users.map((ele)=>{
                    return selected_user.following.includes(ele._id) ?
                      <User key={ele._id} userId={ele._id} name={ele.username} pic={ele.profilePicture} dialog={setFollowingBox}/>:null
                  }):null
                }
            </div>
        </Dialog>
        <Dialog open={followersBox} onClose={()=>setFollowersBox(!followersBox)}>
            <div className='DialogBox'>
                <Typography variant='h4'>Followers</Typography>
                {
                    selected_user.followers.length===0
                    ?<Typography style={{margin:"2vmax"}}>No Followers yet</Typography>
                    :users && users.users.length>0?
                    users.users.map((ele)=>{
                    return selected_user.followers.includes(ele._id) ?
                      <User key={ele._id} userId={ele._id} name={ele.username} pic={ele.profilePicture} dialog={setFollowersBox}/>:null
                  }):null
                }
            </div>
        </Dialog>
    </div>
    :null    
  ))
}

export default Profile