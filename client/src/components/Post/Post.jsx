import React,{useState} from 'react'
import {Avatar,Typography,Button,Dialog} from "@mui/material"
import {MoreVert,Favorite,FavoriteBorder,ChatBubbleOutline,DeleteOutline} from "@mui/icons-material"
import {Link} from "react-router-dom"
import {likePost,unlikePost,commentPost,updatePost,deletePost} from '../../Actions/Post'
import "./Post.css"
import {getFollowingPosts,getUserPosts} from '../../Actions/User'
import { useDispatch ,useSelector} from 'react-redux'
import User from "../User/User"
import Comments from '../Comments/Comments'

const Post = ({
    postId,caption,
    postImage,likes=[],
    comments=[],userImage,
    userName,userId,
    isDelete=false,
    isAccount=false,
    })  => {
    const dispatch = useDispatch()

    const {user} = useSelector((state)=>state.user)
    const {users} = useSelector((state)=>state.allUsers)

    const [like,setLike] = useState(likes.includes(user._id))
    const [likeBox,setLikeBox] = useState(false)
    const [likeCount,setlikeCount] = useState(likes.length)
    
    const [commentVal,setCommentVal] = useState("")
    const [commentBox,setCommentBox] = useState(false)
    
    const [desc,setDesc] = useState(caption)
    const [captionBox,setCaptionBox] = useState(false)

    const handleLike = async() =>{
        if(like){
            setLike(false)
            setlikeCount(likeCount-1)
            await dispatch(unlikePost(postId))
            isAccount?dispatch(getUserPosts()):dispatch(getFollowingPosts())
        }else{
            setLike(true)
            setlikeCount(likeCount+1)
            await dispatch(likePost(postId))
            isAccount?dispatch(getUserPosts()):dispatch(getFollowingPosts())
        }   
    }
    const commentHandler = async(e) =>{
        e.preventDefault()
        await dispatch(commentPost(postId,commentVal))
        isAccount?await dispatch(getUserPosts()):await dispatch(getFollowingPosts())
    }
    const updateHandler = async(e)=>{
        e.preventDefault()
        await dispatch(updatePost(desc,postId))
        dispatch(getUserPosts())
    }
    const deleteHandler = async()=>{
        await dispatch(deletePost(postId))
        dispatch(getUserPosts())
    }
  return (
    <div className='post'>
        <div className='postHeader'>
            <div className='userDetails'>
                <Avatar src={userImage} alt="User" sx={{
                    height:"3vmax",
                    width:"3vmax"
                }}
                style={{alignSelf:"center"}}/>
                <Link to={`/user/${userId}`}>
                    <Typography fontWeight={700}>{userName}</Typography>
                </Link>
            </div>
            {isAccount?<Button onClick={()=>setCaptionBox(!captionBox)}><MoreVert/></Button>:null}   
        </div>
        <img src={postImage} alt="Post" />
        <div className='postDetails'>
            <Link to={`/user/${userId}`}>
                <Typography fontWeight={700}>{userName}</Typography>
            </Link>
            <Typography fontWeight={100} 
                color="rgba(0,0,0,0.582)"
                style={{alignSelf:"center"}}
            >{caption}</Typography>
        </div>
        <button id='likes-btn'
            onClick={()=>setLikeBox(!likeBox)}>
            <Typography>{likeCount} Likes</Typography>
        </button>
        <div className='postFooter'>
            <Button onClick={handleLike}>
                {like?<Favorite style={{color:"red"}}/>:<FavoriteBorder/>}
            </Button>
            <Button onClick={()=>setCommentBox(!commentBox)}>
                <ChatBubbleOutline/>
            </Button>
            {isAccount?<Button onClick={deleteHandler}>
                <DeleteOutline/>
            </Button>:null}
        </div>
        
        <Dialog open={likeBox} onClose={()=>setLikeBox(!likeBox)}>
            <div className='DialogBox'>
                <Typography variant='h4'>Liked by</Typography>
                {
                    likeCount===0
                    ?<Typography>No likes yet</Typography>
                    :users && users.users.length>0?
                    users.users.map((ele)=>{
                    return likes.includes(ele._id) ?
                      <User key={ele._id} userId={ele._id} name={ele.username} pic={ele.profilePicture}/>:null
                  }):null
                }
            </div>
        </Dialog>

        <Dialog open={commentBox} onClose={()=>setCommentBox(!commentBox)}>
            <div className='DialogBox'>
                <Typography variant='h4'>Comments</Typography>
                <form className='commentForm' 
                    onSubmit={commentHandler}>
                    <input type="text" 
                        value={commentVal} 
                        onChange={(e)=>setCommentVal(e.target.value)}
                        placeholder="Make a Comment"
                        required
                    />
                    <Button type='submit' variant='contained'>
                        Done
                    </Button>
                </form>
                {
                    comments.length===0
                    ?<Typography>No Comments yet</Typography>
                    :comments.map((ele)=>{
                        return <Comments key={null} data={ele} postId={postId} isAccount={isAccount}/>
                    })
                }
            </div>
        </Dialog>
        <Dialog open={captionBox} onClose={()=>setCaptionBox(!captionBox)}>
            <div className='updateForm'>
                <Typography variant='h4'>Update Caption</Typography>
                <form className='commentForm' 
                    onSubmit={updateHandler}>
                    <input type="text" 
                        value={desc} 
                        onChange={(e)=>setDesc(e.target.value)}
                        placeholder={caption}
                        required
                    />
                    <Button type='submit' variant='contained'>
                        Update
                    </Button>
                </form>
            </div>
        </Dialog>
    </div>
  )
}

export default Post