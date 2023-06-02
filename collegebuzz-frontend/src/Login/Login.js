import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import "./Login.css";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";
import { apis } from "../api/Api";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
    const [data,setData] = useState({
        userName:"",
        password:""
    })
    let detailsChanged = (e) => {
          setData((values) => ({ ...values, [e.target.name]: e.target.value }));
    };
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        console.log(data)
        axios.post(`${apis.login}`,data).then(
            (res)=>{
                // console.log(res.data)
                localStorage.setItem("Username",res.data.userName);
                localStorage.setItem("Role",res.data.role);
                if(localStorage.getItem("Role") === 'Admin'){
                  navigate("/students");
                }
                else if(localStorage.getItem("Role") === 'Faculty'){
                  navigate("/studentlist");
                }
                else if(localStorage.getItem("Role") === 'Student'){
                  navigate("/student/article");
                }
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
              <h2 className="heading">
                <LoginIcon />
                Login
              </h2>
            </div>
            <div className="ContainerBody">
              <div className="input-container">
                <input type="text" className="field-input" name="userName" onChange={detailsChanged}/>
                <label>Username</label>
                <PersonIcon className="icons-s"/>
              </div>
              <div className="input-container">
                <input type="password" className="field-input" name="password" onChange={detailsChanged}/>
                <label>Password</label>
                <LockIcon className="icons-s"/>
              </div>
              <button type="button" id="log_but" onClick={handleClick}> Login</button>
            </div>
            <div className="ContainerFooter">
              <Link className="forget-pass" to="/forgetpass">Forget Password?</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
