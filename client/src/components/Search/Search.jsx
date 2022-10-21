import { Button, Typography } from "@mui/material";
import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser} from "../../Actions/User";
import User from "../User/User"
import Loader from "../Loader/Loader"
import "./Search.css";

const Search = () => {
  const [name, setName] = useState("");

  const {users,loading } = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(searchUser(name));
  };

  return (
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Hub
        </Typography>

        <input
          type="text"
          value={name}
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Search
        </Button>

        <div className="searchResults">
        {
            loading?<Loader/>:
            users && users.users.length>0?
            users.users.map((ele)=>
              <User key={ele._id} userId={ele._id} name={ele.username} pic={ele.profilePicture}/>
          ):<Typography>No users yet</Typography>
        }
        </div>
      </form>
    </div>
  );
};

export default Search;
