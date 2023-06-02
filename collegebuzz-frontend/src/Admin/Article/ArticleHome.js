import React from "react";
import AdminNavbar from "../Navbar/AdminNavbar";
import Topbar from "./Layout/Topbar";
import Login from "../../Login/Login";

export default function AdminArticle(){

    return(

        <>
        {localStorage.getItem("Role") === "Admin" ?
        <>
            <AdminNavbar/>
            <Topbar/>
        </>
        :<Login/>
    }
        </>
    )
}