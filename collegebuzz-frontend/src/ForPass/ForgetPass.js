import React, { createContext, useState } from 'react'
import '../Login/Login.css'
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from 'react-router-dom';
import { apis } from '../api/Api';
import axios from 'axios';
import ResetPass from './ResetPass';
export const UserContext = createContext();
export function ForgetPass() {
    const navigate = useNavigate();
    const [data,setData] = useState({
        userName:"",
        email:""
    })
    let detailsChanged = (e) => {
          setData((values) => ({ ...values, [e.target.name]: e.target.value }));
    };
    const handleClick = (e) => {
        e.preventDefault();
        console.log(data)
        axios.post(`${apis.forgetpass}`,data).then(
            (res)=>{
              console.log(res.data)
                localStorage.setItem("url",res.data);
                alert("Email is sent to your email account");
                navigate("/");
                // setTimeout(function(){
                //     localStorage.removeItem("url");
                // }.bind(300000));
            },
            (err) => {
                console.log(err)
                alert(err.response.data)
            }
        )
    } 
  return (
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
                <input type="text" className="field-input" name="userName" onChange={detailsChanged}/>
                <label>Username</label>
                <PersonIcon className="icons-s"/>
              </div>
              <div className="input-container">
                <input type="email" className="field-input" name="email" onChange={detailsChanged}/>
                <label>Email</label>
                <MailIcon className='icons-s'/>
              </div>
              <button type="button" id="log_but" onClick={handleClick}> Submit</button>
            </div>
          </div>
        </div>
      </div>
      {/* <div style={{display:"none"}}> */}
        {/* {val==false?<></>: */}
        {/* <ResetPass/> */}
        {/* } */}
      {/* </div> */}
    </>
  )
}

