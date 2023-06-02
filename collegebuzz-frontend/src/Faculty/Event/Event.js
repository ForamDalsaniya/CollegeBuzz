import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { apis } from '../../api/Api';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";
import { Dialog } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PostEvent from './PostEvent';
import FacultyNavbar from '../Layout/FacultyNavbar';
import Login from '../../Login/Login';



export default function Event() {

    const [check,setCheck] = React.useState(false);
    React.useEffect(()=>{
        getAllDetails()
    },[check]);
    const handleCheck = () => {
        if(check)
            setCheck(false)
        else
            setCheck(true)
    }
    const showToastMsg = (e) => {
        toast.success(e, {
          position: toast.POSITION.TOP_RIGHT,
        });
      };
    const [data,setData] = React.useState([]);
    const getAllDetails = () => {
        axios.get(apis.allevents).then(
            (res) => {
                setData(res.data);
                // console.log(res.data)
                handleCheck();
            },
            (err) => {
                console.log(err);
            }
        )
    }

    const columns = ["Title","Description","Organizer","Venue","Cost","Registration End","Event Date","Event Duration","Username"];
    const forIcon = "news";
    var cnt = 0;
    const sidebarList = ['All News','Add News', 'My News'];

  const handleDelete = (e,val) =>{
    axios.delete(`${apis.allfaculties}/${val}`).then(
      (res) => {
        console.log(res.data);
        showToastMsg(res.data);
      },(err) =>{
        console.log(err);
      }
    )
  }
  
  const [addopen, addsetOpen] = React.useState(false);
  const addhandleClickOpen = () => {
    addsetOpen(true);
  };
  const addhandleClose = () => {
    addsetOpen(false);
  };
  function ChangeDate (e) {
    let date = new Date(e);
    let year = date.getFullYear();
    let day = date.getDate();
    let month = date.getMonth()+1;
    return `${day}/${month}/${year}`;
  }
  return (
    <>
    {localStorage.getItem("Role") === "Faculty" ?
    <>
    <ToastContainer/>
    <FacultyNavbar/>
    {/* <AdminNavbar/> */}
    {/* <Sidebar check={handleCheck} list={sidebarList} forIcon={forIcon}/> */}
    <Box sx={{ height: 400, width: 1, marginTop:10,'&.MuiInputBase-root': {
            backgroundColor:'black',
            
          } }}>
      <Typography sx={{ fontSize: 30, fontWeight: "bold", color:'#43b3ae',textAlign:'center' }}>
        Events
      </Typography>
      <TableContainer sx={{ maxHeight: 450, backgroundColor: "#e6e6ff", marginLeft:0, marginRight:0,bgcolor:'#C7E8E7' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Title
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Description
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Organizer
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Venue
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Event Fees
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Registration Till
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Event Date
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Event Duration
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Username
              </TableCell>
              
              {/* <TableCell
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Delete
              </TableCell> */}
            </TableRow>
          </TableHead>
          {/* {data[0].isApproved} */}
          <TableBody>
            {data.map((row,index) => {
              return (
                
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell sx={{fontSize:15}}>{row.title}</TableCell>
                  <TableCell sx={{fontSize:15}}>{row.description}</TableCell>
                  <TableCell sx={{fontSize:15}}>{row.organizer}</TableCell>
                  <TableCell sx={{fontSize:15}}>{row.venue}</TableCell>
                  <TableCell sx={{fontSize:15}}>{row.costs}</TableCell>
                  {/* <TableCell sx={{fontSize:15}}>{dateFormate(row.dob)}</TableCell> */}
                  <TableCell sx={{fontSize:15}}>{ChangeDate(row.registrationEnd)}</TableCell>
                  <TableCell sx={{fontSize:15}}>{ChangeDate(row.eventStart)}</TableCell>
                  <TableCell sx={{fontSize:15}}>{row.duration}</TableCell>
                  <TableCell sx={{fontSize:15}}>{row.userName}</TableCell>
                 
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        // open={updateopen}
        // onClose={updatehandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <UpdateCandidate id={id} close={updatehandleClose} check={handlecheck}/> */}
      </Dialog>
      <Box
        textAlign="center"
        paddingBottom={0}
        paddingLeft={3}
        paddingRight={3}
        paddingTop={3}
      >
        <Button
          onClick={addhandleClickOpen}
          variant="contained"
          startIcon={<AddCircleIcon />}
          style={{ backgroundColor: "#43b3ae" ,fontWeight:'bolder'}}
        >
          Post Event
        </Button>
        <Dialog
          open={addopen}
          onClose={addhandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <PostEvent close={addhandleClose} check={handleCheck}/>
          {/* <AddCandidate close={addhandleClose} /> */}
        </Dialog>
      </Box>
    {/* </Paper> */}
    </Box>
    {/* <Box sx={{alignItems:'center',textAlign:'center',marginTop:0}}>
      <RegisterStudent/>
    </Box> */}
    </>
    : <Login/>
  }
  </>
  );
}
