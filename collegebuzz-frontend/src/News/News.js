import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ResponsiveAppBar from '../Student/Navbar/NavBar';
import axios from 'axios';
import { apis } from '../api/Api';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from '../Student/Navbar/Sidebar';
const VISIBLE_FIELDS = ['ID', 'Title', 'Content', 'Posted On', 'Posted by'];

export default function News(props) {

    const [check,setCheck] = React.useState(false);
    React.useEffect(()=>{
        getAllDetails()
      },[check]);
    // props.check();
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
        axios.get(apis.allnews).then(
            (res) => {
                setData(res.data);
                console.log(res.data)
                handleCheck();
                // showToastMsg(res.data);
            },
            (err) => {
                console.log(err);
                // showToastMsg(err.response.data);
            }
        )
    }
    const columns =  [{ field: 'id', headerName: 'ID' },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'content', headerName: 'Content', width: 600 },
    { field: 'userName', headerName: 'User Name', width: 300 }]
    
    
  return (
    <>

    {/* <ResponsiveAppBar/>
    <Sidebar check={handleCheck} list={sidebarList} forIcon={forIcon}/> */}
    <Box sx={{ height: 400, width: 1, marginTop:15,'&.MuiInputBase-root': {
            backgroundColor:'black',
            
          } }}>
      <DataGrid
      sx={{
        '.css-115moga-MuiDataGrid-root':{

          marginRight:5
        },
        
        // marginRight:3,
        // color:'#43b3ae',
        bgcolor:'black',
        color:'white',
        '.css-3be3ve-MuiFormControl-root-MuiTextField-root-MuiDataGrid-toolbarQuickFilter':{
        },
        '.css-v4u5dn-MuiInputBase-root-MuiInput-root':{
            backgroundColor:'white',
        },
        '.css-ekn1xr-MuiDataGrid-root .MuiDataGrid-columnHeaderTitleContainer':{
          color:'#43b3ae',
          fontSize:'larger'
        },
        '.css-1uqlga7-MuiDataGrid-root .MuiDataGrid-columnHeaderTitleContainer':{
          fontSize:'larger'
        },
        '.MuiDataGrid-columnHeaderTitleContainer':{
          color:'#43b3ae',
          fontSize:'larger'
        },
        '.css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar':{
          bgcolor:'white',
          // color:'#43b3ae'
        },
        '.css-128fb87-MuiDataGrid-toolbarContainer':{
          borderBottom:'0.5px solid white'
        },
        '.css-12v4cm2-MuiDataGrid-root .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell':{
          color:'white'
        }
         }}
         disableColumnFilter
         disableColumnSelector
         disableDensitySelector
         columns={columns}
         rows={data}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </Box>
    </>
  );
}
