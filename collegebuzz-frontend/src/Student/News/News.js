import React from "react";
import ResponsiveAppBar from "../Navbar/NavBar";
import Sidebar from "../Navbar/Sidebar";
import News from "../../News/News";

function StudentNews() {
    const [check,setCheck] = React.useState(false);
    
    const handleCheck = () => {
        if(check)
            setCheck(false)
        else
            setCheck(true)
    }
    const forIcon = "news";
    const sidebarList = ['All News','Add News', 'My News'];
  return (
    <>
      <ResponsiveAppBar/>
      <Sidebar check={handleCheck} list={sidebarList} forIcon={forIcon}/>
      <div style={{marginLeft:'15%',marginRight:15}}>
        <News />
      </div>
    </>
  )
}

export default StudentNews
