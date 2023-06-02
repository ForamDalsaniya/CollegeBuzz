import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField, Typography } from "@mui/material";
import axios from "axios";
import { apis } from "../../api/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventIcon from "@mui/icons-material/Event";
import Login from "../../Login/Login";

export default function PostEvent({ close, check }) {
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
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
    title: "",
    description: "",
    userName: "",
    organizer: "",
    venue: "",
    costs: "",
    registrationStart: "",
    registrationEnd: "",
    eventStart: "",
    duration: "",
  });
  const showToastMsg = (e) => {
    toast.success(e, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handlePostClick = (e) => {
    e.preventDefault();
    var date = new Date(data.dOB);
    setData((values) => ({ ...values, dOB: date }));
    console.log(data);
    axios.post(`${apis.allevents}`, data).then(
      (res) => {
        console.log(res.data);
        check();
        handleClose();
        showToastMsg(res.data);
      },
      (err) => {
        handleClose();
        showToastMsg(err.response.data);
      }
    );
  };
  let detailsChanged = (e) => {
    setData((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {localStorage.getItem("Role") === "Faculty" ? (
        <>
          <div style={{ backgroundColor: "#e6e6ff" }}>
            <Dialog
              open={open}
              onClose={handleClose}
              scroll={scroll}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle id="scroll-dialog-title">
                <EventIcon
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
                  Add Event
                </Typography>
              </DialogTitle>
              <DialogContent dividers={scroll === "paper"}>
                <DialogContentText
                  id="scroll-dialog-description"
                  ref={descriptionElementRef}
                  tabIndex={-1}
                >
                  <form>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        marginTop: 3,
                      }}
                    >
                      <TextField
                        id="input-with-sx"
                        label="Title"
                        variant="outlined"
                        sx={{
                          "& .MuiFormLabel-root.Mui-focused": {
                            color: "#43b3ae",
                          },
                          width: "100%",
                        }}
                        onChange={detailsChanged}
                        name="title"
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        marginTop: 3,
                      }}
                    >
                      <TextField
                        id="standard-multiline-flexible"
                        label="Description"
                        variant="outlined"
                        multiline
                        maxRows={6}
                        onChange={detailsChanged}
                        name="description"
                        sx={{
                          "& .MuiFormLabel-root.Mui-focused": {
                            color: "#43b3ae",
                          },
                          width: "100%",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        marginTop: 3,
                      }}
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
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        marginTop: 3,
                      }}
                    >
                      <TextField
                        id="standard-multiline-flexible"
                        label="Organizer"
                        variant="outlined"
                        onChange={detailsChanged}
                        name="organizer"
                        sx={{
                          "& .MuiFormLabel-root.Mui-focused": {
                            color: "#43b3ae",
                          },
                          width: "100%",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        marginTop: 3,
                      }}
                    >
                      <TextField
                        id="standard-multiline-flexible"
                        label="Venue"
                        variant="outlined"
                        onChange={detailsChanged}
                        name="venue"
                        sx={{
                          "& .MuiFormLabel-root.Mui-focused": {
                            color: "#43b3ae",
                          },
                          width: "100%",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        marginTop: 3,
                      }}
                    >
                      <TextField
                        id="standard-multiline-flexible"
                        label="Event Fees"
                        variant="outlined"
                        onChange={detailsChanged}
                        name="costs"
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
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        marginTop: 3,
                      }}
                    >
                      <TextField
                        id="standard-multiline-flexible"
                        label="Registration Start Date"
                        onChange={detailsChanged}
                        name="registrationStart"
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
                      }}
                    >
                      <TextField
                        id="standard-multiline-flexible"
                        label="Registration Till"
                        onChange={detailsChanged}
                        name="registrationEnd"
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
                      }}
                    >
                      <TextField
                        id="standard-multiline-flexible"
                        label="Event Start Date"
                        onChange={detailsChanged}
                        name="eventStart"
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
                      }}
                    >
                      <TextField
                        id="standard-multiline-flexible"
                        label="Time Duration of an Event"
                        variant="outlined"
                        onChange={detailsChanged}
                        name="duration"
                        sx={{
                          "& .MuiFormLabel-root.Mui-focused": {
                            color: "#43b3ae",
                          },
                          width: "100%",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        marginTop: 3,
                      }}
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
                        Add
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
      ) : (
        <Login />
      )}
    </>
  );
}
