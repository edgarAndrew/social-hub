import React from 'react'
import {Link} from "react-router-dom"
import {Typography} from "@mui/material"
import {getSingleUser} from '../../Actions/User'
import {useDispatch} from 'react-redux'
import "./User.css"
const User = ({
  userId,name,pic,dialog
}) => {
  const dispatch = useDispatch()

  return (
    <Link to={`/user/${userId}`} className='homeUser' onClick={()=>{
      dialog?.dialog(false);  // is dialog function exists only then call it
      dispatch(getSingleUser(userId))
    }}>
      <img src={pic} alt='' />
      <Typography>
        {name}
      </Typography>
    </Link>
  )
}

export default User