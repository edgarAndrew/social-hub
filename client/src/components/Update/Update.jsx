import { Avatar, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Register/Register.css"
import Loader from "../Loader/Loader";
import {updateUser,loadUser} from "../../Actions/User";
import { useAlert } from "react-alert";

const Update = () => {

    const { user,loading, error } = useSelector((state) => state.user);
    const [name, setName] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState(user.profilePicture);

    const dispatch = useDispatch();
    const alert = useAlert();
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
        if (Reader.readyState === 2) {
            setAvatar(Reader.result);
        }
        };
    };
    const handleUpload = async() =>{
      const pic = user.profilePicture === avatar ? null : avatar
      await dispatch(updateUser(user._id,name,email,pic))
      await dispatch(loadUser())
      if(!loading && !error)
        alert.success("Profile updated")
      
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch({ type: "clearErrors" })
        //dispatch(registerUser(name, email, avatar));
    };
    useEffect(() => {
        if (error && error?.msg !== 'No Token provided') {
        dispatch({ type: "clearErrors" })
        alert.error(error.msg)
        }
    }, [dispatch, error, alert]);
  return (
    loading ? <Loader/> :
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3">
          Social Hub
        </Typography>

        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          value={name}
          placeholder="Name"
          className="registerInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="registerInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={loading} type="submit" onClick={handleUpload}
        style={{marginTop:"10px 0px"}}>
          Update
        </Button>
      </form>
    </div>
  );
};

export default Update;
