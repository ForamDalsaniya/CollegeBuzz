import React, { createContext, useContext, useState } from 'react'
import '../Login/Login.css'
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from 'react-router-dom';
import { apis } from '../api/Api';
import axios from 'axios';
// const UserContext = createContext();
function ResetPass() {
    const [data,setData] = useState({
        password:"",
        userName:'ForamPD911'
        // userName:user.username,
    });
    // console.log(user);
    let detailsChanged = (e) => {
          setData((values) => ({ ...values, [e.target.name]: e.target.value }));
    };
    const [url,setUrl] = useState(localStorage.getItem("url"));
    console.log(localStorage.getItem("url"))
    const navigate = useNavigate();
    const handleClick = (e) => {
        
        e.preventDefault();
        // console.log("here: "+data)
        axios.post(url,data).then(
            (res)=>{
                console.log(res.data)
                localStorage.removeItem("url");
                alert(res.data)
                navigate("/");
            },
            (err) => {
                console.log("here")
                // alert(err)
            }
        )
    } 
  return (
    <>
        {url !== "" ? 
    <>
     <div className="app">
        <div className="app-container">
          <div className="container-box">
            <div className="ContainerHeader">
                <LockIcon className="icons-s"/>
              <h2 className="heading">
                Reset Password
              </h2>
            </div>
            <div className="ContainerBody">
              <div className="input-container">
                <input type="password" className="field-input" name="password" onChange={detailsChanged}/>
                <label>New Password</label>
                <LockIcon className='icons-s'/>
              </div>
              <button type="button" id="log_but" onClick={handleClick}> Change</button>
            </div>
          </div>
        </div>
      </div>
    </>
    : "Timeout occurs"
  }
  </>
  )
}

export default ResetPass

