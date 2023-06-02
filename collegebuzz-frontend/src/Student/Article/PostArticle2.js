import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ArticleIcon from "@mui/icons-material/Article";
import CollectionsIcon from "@mui/icons-material/Collections";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { apis } from "../../api/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
export default function PostArticle2(props) {
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const location = useLocation();
  const handleClose = () => {
    setOpen(false);
    props.close()
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
  const [file1, setFile1] = React.useState("");
  const [file, setFile] = React.useState("");
  const handleUploadClick = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setFile1(url);
    setFile(e.target.files[0]);
    console.log(file);
    console.log(file1)
  };

  const [error, setError] = React.useState([
    {
      title: false,
      content: false,
      image: false,
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
    const formData = new FormData();
    formData.append("pic", file);
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("userName", "fpatel");

    console.log(data);
    axios.post(`${apis.postarticle}`, formData).then(
      (res) => {
        handleClose();
        // navigate("/student/article")
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
        {/* <Button onClick={handleClickOpen("paper")} variant="contained">Post Article</Button> */}
        {/* <Button onClick={handleClickOpen('body')}>scroll=body</Button> */}
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
              Post Article
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
                    // sx={{ width: "100%" }}
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
                    variant="outlined"
                    component="label"
                    sx={{
                      width: "100%",
                      borderColor: "rgb(118, 118, 118)",
                      color: "#43b3ae",
                    }}
                  >
                    Upload
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={handleUploadClick}
                      name="pic"
                    />
                    <IconButton
                      sx={{ color: "#43b3ae" }}
                      aria-label="upload picture"
                      component="label"
                    >
                      <CollectionsIcon />
                    </IconButton>
                  </Button>
                </Box>
                {error.image && (
                  <small style={{ color: "red" }}>Image is required</small>
                )}
                {file1.length > 0 && (
                  <Card
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      margin: "auto",
                      marginTop: 3,
                    }}
                  >
                    <CardActions
                      sx={{ alignContent: "center", margin: "auto" }}
                    >
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        image={file1}
                        title="Contemplative Reptile"
                        sx={{
                          height: 300,
                          alignContent: "center",
                          margin: "auto",
                        }}
                      />
                    </CardActions>
                  </Card>
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
