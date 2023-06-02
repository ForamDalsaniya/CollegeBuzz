import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import RecipeReviewCard from "../../Student/Article/Card";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "../../Login/Login";

export default function ArticleAdmin(props) {
  const [check, setCheck] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(props.url);
  useEffect(() => {
    getData();
  }, [check, url]);
  const getData = () => {
    axios.get(`${url}`).then(
      (res) => {
        setData(res.data);
        console.log(typeof res.data);
        setLoading(false);
        handleCheck();
      },
      (err) => console.log(err)
    );
  };
  function ChangeDate(e) {
    let date = new Date(e);
    let year = date.getFullYear();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    return `${day}/${month}/${year}`;
  }
  const handleCheck = () => {
    if (check) setCheck(false);
    else setCheck(true);
  };
  return (
    <>
      {localStorage.getItem("Role") === "Admin" ? (
        <>
          <ToastContainer />
          <Box component="main" sx={{ flexGrow: 1, mt: 6 }}>
            {/* <PostArticle2 /> */}
            <Grid
              sx={{ flexGrow: 1, overflowX: "initial", zIndex: 400 }}
              container
              spacing={1}
            >
              <Grid item xs={12}>
                {/* {data.length} */}
                <Grid container justifyContent="center" spacing={8}>
                  {data.map((value) => (
                    <Grid key={value.id} item>
                      <RecipeReviewCard
                        key={value.id}
                        title={value.title}
                        pic={value.pic}
                        id={value.id}
                        content={value.content}
                        postedon={ChangeDate(value.postedDate)}
                        user={value.userName}
                        approve={value.isApproved}
                        check={handleCheck}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
