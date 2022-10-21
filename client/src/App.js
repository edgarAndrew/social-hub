import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Header from "./components/Header/Header"
import Login from "./components/Login/Login"
import Profile from "./components/Profile/Profile"
import Home from "./components/Home/Home"
import Search from './components/Search/Search';
import Upload from "./components/Upload/Upload"
import Update from './components/Update/Update'
import Register from './components/Register/Register';
import Password from './components/Update/Password';
import NotFound from './components/NotFound/NotFound';
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {loadUser} from "./Actions/User"

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadUser())
  },[dispatch])

  const {isAuthenticated} = useSelector((state)=>state.user);
  
  return (
  <Router>
    {isAuthenticated && <Header/>}
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={isAuthenticated?<Home/>:<Login/>}/>
      <Route path="/account" element={isAuthenticated?<Profile isAccount={true}/>:<Login/>}/>
      <Route path="/uploadpost" element={isAuthenticated?<Upload/>:<Login/>}/>
      <Route path="/user/:id" element={isAuthenticated?<Profile/>:<Login/>}/>
      <Route path="/search" element={isAuthenticated?<Search/>:<Login/>}/>
      <Route path="/update/profile" element={isAuthenticated?<Update/>:<Login/>}/>
      <Route path="/update/password" element={isAuthenticated?<Password/>:<Login/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  
  </Router>
  )
}

export default App;
