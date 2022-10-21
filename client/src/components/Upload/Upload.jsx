import React,{useState,useEffect} from 'react'
import './Upload.css'
import {Typography,Button} from '@mui/material'
import {uploadPost} from "../../Actions/Post"
import {useDispatch,useSelector} from "react-redux"
import {useAlert} from 'react-alert'

const Upload = () => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const {loading,error,message} = useSelector((state)=>state.uploadPost)
    const [image,setImage] = useState(null);
    const [caption,setCaption] = useState("");


    const handleImageChange = (e)=>{
        const file = e.target.files[0]
        const Reader = new FileReader()
        Reader.readAsDataURL(file)

        Reader.onload = ()=>{
            if(Reader.readyState === 2){
                setImage(Reader.result)
            }
        }   
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch({type:"clearErrors"})
        dispatch(uploadPost(caption,image))
    }
    useEffect(()=>{
        if(error){
            dispatch({type:"clearErrors"})
            alert.error(error)
        }
        if(message){
            dispatch({type:"clearMessage"})
            alert.success(message.status)
        }
    },[dispatch,error,message,alert])

    return (
        <div className='newPost'>
            <form className='newPostForm' onSubmit={handleSubmit}>
                <Typography variant='h3'>Upload Post</Typography>
                {image?<img src={image} alt="post"/>:null}
                <input type="file" accept='image/*'onChange={handleImageChange}/>
                <input type="text" placeholder='Caption...' value={caption} 
                    onChange={(e)=>setCaption(e.target.value)}/>
                <Button disabled={loading} type="submit">Done</Button>
            </form>
        </div>
    )
}

export default Upload