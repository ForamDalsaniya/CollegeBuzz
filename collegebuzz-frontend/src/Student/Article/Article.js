import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../Navbar/NavBar";
import PostArticle2 from "./PostArticle2";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { apis } from "../../api/Api";
import Loading from "../../Loading";
import RecipeReviewCard from "./Card";
import Box from "@mui/material/Box";
import Sidebar from "../Navbar/Sidebar";
import Login from "../../Login/Login";

// export default function SpacingGrid() {
function Article() {
  const [check, setCheck] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, [check]);
  const getData = () => {
    axios.get(`${apis.allarticle}`).then(
      (res) => {
        setData(res.data);
        console.log(typeof res.data);
        setLoading(false);
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
  var k = 0;
  const handlecheck = () => {
    if (check) setCheck(false);
    else setCheck(true);
  };
  const forIcon = "article";
  const sidebarList = ["All Post", "Add Post", "My Post"];
  return (
    <>
      {localStorage.getItem("Role") === "Student" ? (
        <>
          <ResponsiveAppBar />
          {/* </ResponsiveAppBar> */}
          {/* <Sidebar/> */}
          {loading == true ? (
            <Loading />
          ) : (
            <>
              <Sidebar
                check={handlecheck}
                list={sidebarList}
                forIcon={forIcon}
              />
              <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, marginLeft: 28, marginTop: 10 }}
              >
                {/* <PostArticle2 /> */}
                <Grid
                  sx={{ flexGrow: 1, overflowX: "initial", zIndex: 400 }}
                  container
                  spacing={2}
                >
                  <Grid item xs={12}>
                    {/* {data.length} */}
                    <Grid container justifyContent="center" spacing={8}>
                      {data.map((value) => (
                        <Grid key={k} item>
                          {/* <Paper
                  sx={{
                    height: 360,
                    width: 380,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                > */}
                          <RecipeReviewCard
                            key={k++}
                            title={value.title}
                            pic={value.pic}
                            content={value.content}
                            postedon={ChangeDate(value.postedDate)}
                            user={value.userName}
                          />
                          {/* {data[0].title} */}
                          {/* {data[0].content} */}
                          {/* </Paper> */}
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
          {/* } */}
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
export default Article;
