import React,{useState,useEffect} from 'react'
import "./Login.css"
import {Typography,Button} from "@mui/material"
import {Link} from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'
import { loginUser } from '../../Actions/User'
import Loader from '../Loader/Loader'
import {useAlert} from 'react-alert'

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert()

  const { message ,loading, error } = useSelector((state) => state.user);

  const loginHandler = (e)=>{
    e.preventDefault();
    dispatch(loginUser(email,password))
  }
  useEffect(() => {
    if (error && error?.msg !== 'No Token provided') {
      dispatch({ type: "clearErrors" })
      alert.error(error.msg)
    }
    if(message){
      alert.success(message)
      dispatch({ type: "clearErrors" })
    }
  }, [dispatch, error, alert,message]);

  return loading ? <Loader/>:
    <div className='login'>
      <form className='loginForm' onSubmit={loginHandler}>
        <Typography variant='h3' style={{padding:"2vmax",textAlign:"center"}}>
          Social Hub
        </Typography>
          <input type="email" placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <Link to="/forgot/password">
            <Typography>
              Forgot Password
            </Typography>
          </Link>
          <Button type="submit">Login</Button>
          <Link to="/register">
            <Typography>
              New User? 
            </Typography>
          </Link>
      </form>
    </div>
  
}

export default Login