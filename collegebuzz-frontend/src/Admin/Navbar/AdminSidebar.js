import React, { useEffect, useState } from "react";
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '@mui/material/Drawer';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Typography from '@mui/material/Typography'
import ArticleIcon from '@mui/icons-material/Article';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Loading";
import PostArticle2 from "../Article/PostArticle2";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AddCardIcon from '@mui/icons-material/AddCard';
import CreditCardIcon from '@mui/icons-material/CreditCard';
const drawerWidth = 200;



function AdminSidebar(props){

  const [loading,setLoading] = useState(false);
  const [linklist,setLinklist] = useState();
  useEffect(()=>{
    setLink();
    setLoading(true);
  },[])
  const [open,setOpen] = useState(false);
  const setLink = () => {
    if(props.forIcon === 'article')
    setLinklist(['/student/article','/postarticle','/']);
    else if(props.forIcon === 'news')
    setLinklist(['/news','/postnews','/']);
  }
  const navigate = useNavigate();
  const handleClick = (e,val) => {
    // e.preventDefault();
    console.log(val)
    if(val === '/postarticle')
      setOpen(true)
    else
      navigate(val);
  }
  const handleOpen = () => {
    setOpen(false);
  }
    return(

      <>
      {loading == true ?

        <div style={{backgroundColor:'black'}}>
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            zIndex:'0',
            paddingTop:10,
            backgroundColor:'#121212',
            overflow:'hidden'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* <Toolbar /> */}
        {/* <Divider /> */}
        <List>
           {/* {['All Post','Add Post', 'My Post'].map((text, index) => ( */}
          {(props.list).map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {props.forIcon === 'article'?
                  index  === 0 ? <LibraryBooksIcon sx={{fontSize:'30px', color:'#43b3ae'}} /> : 
                  index  === 1 ? <PostAddIcon sx={{fontSize:'30px', color:'#43b3ae'}} /> : 
                  <ArticleIcon sx={{fontSize:'30px', color:'#43b3ae'}}/>
                : 
                index == 0 ?<NewspaperIcon sx={{fontSize:'30px', color:'#43b3ae'}}/> :
                index===1 ?<AddCardIcon sx={{fontSize:'30px', color:'#43b3ae'}}/>:
                <CreditCardIcon sx={{fontSize:'30px', color:'#43b3ae'}}/>
                }
                </ListItemIcon>
                {open===true ?
                    <PostArticle2 back={handleOpen}/>
                    :
                <button key={index} onClick={(e) => handleClick(e,linklist[index])}>
                <ListItemText  primary={<Typography variant='body2' sx={{color:'#43b3ae'}}>{text}</Typography>} ></ListItemText>
                </button>
                 }
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
      </Drawer>
        </div>
        :
        <Loading/>}
        </>
    )
}
export default AdminSidebar;