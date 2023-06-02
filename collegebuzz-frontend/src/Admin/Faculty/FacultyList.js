import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { apis } from '../../api/Api';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from '../Navbar/AdminNavbar';
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";
import { Dialog } from "@mui/material";
import RegisterFaculty from './RegisterFaculty';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Login from '../../Login/Login';



export default function Faculty() {

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
        axios.get(apis.allfaculties).then(
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
    const columns =  [{ field: 'facultyId', headerName: 'Faculty ID' },
    { field: 'name', headerName: 'Name',width:160},
    { field: 'userName', headerName: 'User Name'},
    { field: 'designation', headerName: 'Designation'},
    { field: 'phoneNumber', headerName: 'Contact No.', width:140},
    { field: 'dob', headerName: 'DOB'},
    { field: 'address', headerName: 'Address'},

]
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
  return (
    <>
    { localStorage.getItem("Role") === "Admin" ?
    <>
    <ToastContainer/>
    <AdminNavbar/>
    {/* <Sidebar check={handleCheck} list={sidebarList} forIcon={forIcon}/> */}
    <Box sx={{ height: 400, width: 1, marginTop:10,'&.MuiInputBase-root': {
            backgroundColor:'black',
            
          } }}>
      <Typography sx={{ fontSize: 30, fontWeight: "bold", color:'#43b3ae',textAlign:'center' }}>
        Faculties
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
                Faculty ID
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Name
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Contact
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Date Of Birth
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
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Designation
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Address
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Update
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          {/* {data[0].isApproved} */}
          <TableBody>
            {data.map((row) => {
              return (
                
                <TableRow hover role="checkbox" tabIndex={-1} key={row.facultyId}>
                  <TableCell sx={{fontSize:15}}>{row.facultyId}</TableCell>
                  <TableCell sx={{fontSize:15}}>{row.name}</TableCell>
                  <TableCell sx={{fontSize:15}}>{row.phoneNumber}</TableCell>
                  <TableCell sx={{fontSize:15}}>{row.dob}</TableCell>
                  {/* <TableCell sx={{fontSize:15}}>{dateFormate(row.dob)}</TableCell> */}
                  <TableCell sx={{fontSize:15}}>{row.userName}</TableCell>
                  <TableCell sx={{fontSize:15}}>{row.designation}</TableCell>
                  <TableCell sx={{fontSize:15}}>
                    {row.address}
                    
                  </TableCell>
                  <TableCell>
                    <Button
                      // onClick={(e)=>updatehandleClickOpen(e,row.adharid)}
                      variant="contained"
                      startIcon={<UpdateIcon />}
                      color="success"
                    >
                      {/* {console.log(row.adharid)} */}
                      {/* Update */}
                    </Button>
                    {/* {console.log(row.isApproved)} */}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      style={{ backgroundColor: "#ff4d4d" }}
                      onClick={(e)=>{
                        handleDelete(e,row.facultyId)
                      }}
                    >
                      {/* Delete */}
                    </Button>
                  </TableCell>
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
          Add Faculty
        </Button>
        <Dialog
          open={addopen}
          onClose={addhandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <RegisterFaculty close={addhandleClose} check={handleCheck}/>
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
