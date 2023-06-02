import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { apis } from "../../api/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Login } from "@mui/icons-material";

export default function RegisterStudent({close}) {
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState("paper");
  // const [role,setRole] = React.useState(localStorage.getItem("Role"));
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const location = useLocation();
  const handleClose = () => {
    setOpen(false);
    close();
    // props.back();
    // navigate("/students");
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const [data, setData] = React.useState({
    studentId: "",
    name: "",
    userName: "",
    email: "",
    gender: "",
    semester: 0,
    password: "",
    phoneNumber: "",
    dOB: "",
  });
  const showToastMsg = (e) => {
    toast.success(e, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const navigate = useNavigate();
  const handlePostClick = (e) => {
    e.preventDefault();
    var date = new Date(data.dOB);
    setData((values) => ({ ...values, dOB: date }))
    console.log(data);
    axios.post(`${apis.registerStudent}`, data).then(
      (res) => {
        handleClose();
        console.log(res.data);
        showToastMsg(res.data);
      },
      (err) => {
        handleClose();
        showToastMsg(err.response.data);
      }
    );
  };
  let detailsChanged = (e) => {
    // if(e.target.name === 'dOB'){
    //   var date = new Date(e.target.value);
    //   setData((values) => ({...values,[e.target.name]:date}));
    // }
    // else{
      setData((values) => ({ ...values, [e.target.name]: e.target.value }));
    // }
  };

  return (
    <>
    {localStorage.getItem("Role")  == "Admin" ?
    <>
      <div style={{backgroundColor:'#e6e6ff'}}>
        {/* <Button onClick={handleClickOpen("paper")} variant="contained" sx={{alignItems:'center', margin:'auto'}}>
          Register Student
        </Button> */}
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="scroll-dialog-title" >
            <PersonAddAlt1Icon
              sx={{
                color: "#43b3ae",
                display: "flex",
                my: 0.5,
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                fontSize: 40,
                
              }}
            />
            <Typography
              variant="h6"
              sx={{ textAlign: "center", color: "#43b3ae" }}
            >
              Add student
            </Typography>
          </DialogTitle>
          <DialogContent dividers={scroll === "paper"} >
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <form>
                <Box
                  sx={{ display: "flex", alignItems: "flex-end", marginTop: 3 }}
                >
                  <TextField
                    id="input-with-sx"
                    label="Student ID"
                    variant="outlined"
                    sx={{
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: "#43b3ae",
                      },
                      width: "100%",
                    }}
                    onChange={detailsChanged}
                    name="studentId"
                  />
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "flex-end", marginTop: 3 }}
                >
                  <TextField
                    id="standard-multiline-flexible"
                    label="Name"
                    variant="outlined"
                    onChange={detailsChanged}
                    name="name"
                    sx={{
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: "#43b3ae",
                      },
                      width: "100%",
                    }}
                  />
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "flex-end", marginTop: 3 }}
                >
                  <TextField
                    id="standard-multiline-flexible"
                    label="Username"
                    variant="outlined"
                    onChange={detailsChanged}
                    name="userName"
                    sx={{
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: "#43b3ae",
                      },
                      width: "100%",
                    }}
                  />
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "flex-end", marginTop: 3 }}
                >
                  <TextField
                    id="standard-multiline-flexible"
                    label="Email"
                    variant="outlined"
                    onChange={detailsChanged}
                    name="email"
                    sx={{
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: "#43b3ae",
                      },
                      width: "100%",
                    }}
                  />
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "flex-end", marginTop: 3 }}
                >
                  <TextField
                    id="standard-multiline-flexible"
                    label="Password"
                    variant="outlined"
                    onChange={detailsChanged}
                    name="password"
                    sx={{
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: "#43b3ae",
                      },
                      width: "100%",
                    }}
                    type="password"
                  />
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "flex-end", marginTop: 3 }}
                >
                  <TextField
                    id="standard-multiline-flexible"
                    label="Contact No"
                    variant="outlined"
                    onChange={detailsChanged}
                    name="phoneNumber"
                    sx={{
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: "#43b3ae",
                      },
                      width: "100%",
                    }}
                  />
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "flex-end", marginTop: 3 }}
                >
                  <TextField
                    id="standard-multiline-flexible"
                    label="Date Of Birth"
                    onChange={detailsChanged}
                    name="dOB"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: "#43b3ae",
                      },
                      width: "100%",
                    }}
                    type="date"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginTop: 3,
                    width: "100%",
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={data.gender}
                      label="Gender"
                      onChange={detailsChanged}
                      inputProps={{
                        name: "gender",
                      }}
                    >
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "flex-end", marginTop: 3 }}
                >
                  <TextField
                    id="standard-multiline-flexible"
                    label="Current Semester"
                    variant="outlined"
                    onChange={detailsChanged}
                    name="semester"
                    sx={{
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: "#43b3ae",
                      },
                      width: "100%",
                    }}
                    type="number"
                  />
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "flex-end", marginTop: 3 }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      margin: "auto",
                      width: 140,
                      bgcolor: "#43b3ae",
                      "&:hover": {
                        backgroundColor: "#43b3ae",
                        width: 150,
                        fontSize: 16,
                      },
                    }}
                    onClick={handlePostClick}
                  >
                    Register
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      margin: "auto",
                      width: 140,
                      bgcolor: "#43b3ae",
                      "&:hover": {
                        backgroundColor: "#43b3ae",
                        width: 150,
                        fontSize: 16,
                      },
                    }}
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Box>
              </form>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </>
    :<Login/>
  }
  </>
  );
}
