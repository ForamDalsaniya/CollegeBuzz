import React from "react";
import ResponsiveAppBar from "../../Student/Navbar/NavBar";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { apis } from "../../api/Api";
import FacultyNavbar from "../Layout/FacultyNavbar";
import Login from "../../Login/Login";

function StudentList() {
  const [check, setCheck] = React.useState(false);
  React.useEffect(() => {
    getAllDetails();
  }, [check]);
  const handleCheck = () => {
    if (check) setCheck(false);
    else setCheck(true);
  };
  const [data, setData] = React.useState([]);
  const getAllDetails = () => {
    axios.get(apis.allstudent).then(
      (res) => {
        setData(res.data);
        console.log(res.data);
        handleCheck();
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const columns = [
    { field: "studentId", headerName: "Student ID" },
    { field: "name", headerName: "Name", width: 160 },
    { field: "userName", headerName: "User Name" },
    { field: "semester", headerName: "Semester" },
    { field: "phoneNumber", headerName: "Contact No.", width: 140 },
    { field: "dob", headerName: "DOB" },
    { field: "isApproved", headerName: "Is Approved" },
  ];

  return (
    <>
      {localStorage.getItem("Role") === "Faculty" ? (
        <>
          <FacultyNavbar />
          <Box
            sx={{
              // height: 400,
              width: 1,
              marginTop: 15,
              "&.MuiInputBase-root": {
                backgroundColor: "black",
                marginLeft: 28,
              },
            }}
          >
            <DataGrid
              sx={{
                ".css-115moga-MuiDataGrid-root": {
                  marginLeft: 5,
                  marginRight: 5,
                },
                marginLeft: 5,
                marginRight: 5,
                // color:'#43b3ae',
                bgcolor: "black",
                color: "white",
                ".css-3be3ve-MuiFormControl-root-MuiTextField-root-MuiDataGrid-toolbarQuickFilter":
                  {},
                ".css-v4u5dn-MuiInputBase-root-MuiInput-root": {
                  backgroundColor: "white",
                },
                ".css-ekn1xr-MuiDataGrid-root .MuiDataGrid-columnHeaderTitleContainer":
                  {
                    color: "#43b3ae",
                    fontSize: "larger",
                  },
                ".css-1uqlga7-MuiDataGrid-root .MuiDataGrid-columnHeaderTitleContainer":
                  {
                    fontSize: "larger",
                  },
                ".MuiDataGrid-columnHeaderTitleContainer": {
                  color: "#43b3ae",
                  fontSize: "larger",
                },
                ".css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar": {
                  bgcolor: "white",
                  // color:'#43b3ae'
                },
                ".css-128fb87-MuiDataGrid-toolbarContainer": {
                  borderBottom: "0.5px solid white",
                },
                ".css-12v4cm2-MuiDataGrid-root .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell":
                  {
                    color: "white",
                  },
              }}
              getRowId={(row) => row.studentId}
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
      ) : (
        <Login />
      )}
    </>
  );
}
export default StudentList;
