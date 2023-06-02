import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ArticleIcon from "@mui/icons-material/Article";
import {
  Box,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { apis } from "../api/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";



export default function PostNews(props) {
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState("paper");
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const location = useLocation();
  const handleClose = () => {
    props.close()
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    console.log(location)
  }, [open]);
  const [error, setError] = React.useState([
    {
      title: false,
      content: false,
    },
  ]);
  const [data, setData] = React.useState({
    title: "",
    content: "",
    userName: "fpatel",
  });
  const showToastMsg = (e) => {
    toast.success(e, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const navigate = useNavigate();
  const handlePostClick = (e) => {
    e.preventDefault();

    console.log(data);
    axios.post(`${apis.allnews}`, data).then(
      (res) => {
        handleClose();
        console.log(res.data);
        showToastMsg(res.data);
      },
      (err) => {
        handleClose();
        // navigate("/student/article")
        showToastMsg(err.response.data);
      }
    );
  };
  let detailsChanged = (e) => {
    setData((values) => ({ ...values, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <ToastContainer />
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          // sx={{width: '75% !important'}}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="scroll-dialog-title">
            <ArticleIcon
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
              Post News
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
                  sx={{ display: "flex", alignItems: "flex-end", marginTop: 3 }}
                >
                  <TextField
                    id="input-with-sx"
                    label="Title"
                    variant="outlined"
                    sx={{
                      // "& .MuiFormLabel-root": {
                      //     color: 'green'
                      // },
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: "#43b3ae",
                      },
                      width: "100%",
                    }}
                    onChange={detailsChanged}
                    name="title"
                  />
                </Box>
                {error.title && (
                  <small style={{ color: "red" }}>Title is required</small>
                )}
                <Box
                  sx={{ display: "flex", alignItems: "flex-end", marginTop: 3 }}
                >
                  <TextField
                    id="standard-multiline-flexible"
                    label="Content"
                    multiline
                    maxRows={4}
                    variant="outlined"
                    onChange={detailsChanged}
                    name="content"
                    sx={{
                      "& .MuiFormLabel-root.Mui-focused": {
                        color: "#43b3ae",
                      },
                      width: "100%",
                    }}
                  />
                </Box>
                {error.content && (
                  <small style={{ color: "red" }}>Content is required</small>
                )}
                
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
                    Post
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
          {/* <DialogActions>
          <Button onClick={handleClose}>Post</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions> */}
        </Dialog>
      </div>
    </>
  );
}
