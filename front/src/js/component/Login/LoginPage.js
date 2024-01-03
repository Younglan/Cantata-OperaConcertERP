import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Checkbox } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import { Link } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
import React, { useState } from "react";
import { SERVER_URL } from "../constants";

import { parseJwt } from "../../../loginUtil";
import FindModal from "./FindModal";
// import { Routes, Route, BrowserRouter } from "react-router-dom";
// import SignUp from "./SignUp";

function LoginPage() {
  const [user, setUser] = useState({
    id: "",
    password: "",
  });
  const [isAuthenticated, setAuth] = useState(false);
  const navigate = useNavigate();
  const [openFindModal ,setOpenFindModal] = useState(false);
  const handleCloseWithReset = () =>{
    setOpenFindModal(false);
  };
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // const handleSubmit = () => {
  //   login();
  // }

  const login = () => {
    fetch(SERVER_URL + "login/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        const jwtToken = res.headers.get("Authorization");
        if(res.ok){
          
          if (jwtToken !== null) {
            sessionStorage.setItem("jwt", jwtToken);
            console.log(parseJwt(jwtToken))
            setAuth(true);
            updateRecentDate();
          }
        }else{
          alert("회원 정보를 찾을 수 없습니다.")
        }
        
      })
      .catch((err) => console.error(err));
  };
  const updateRecentDate = () =>{
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "member/updateRecent" + `/?id=${user.id}`, {
      headers:{'Authorization':token}
    })
  
    .then(response=>response.json())
    .then(data=>sessionStorage.setItem("role", data.auth))
    .catch((e)=>console.error(e));
  
  };
  if (isAuthenticated) {
    return <Navigate to="/"/>
  } else {
    return (
      <div className="loginform">
        <Box
          sx={{
            marginTop: 8,
            height:"1080px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <div>
            <TextField
              label="아이디"
              name="id"
              onChange={handleChange}
              required
              fullWidth
              autoFocus
              margin="normal"
            />

            <TextField
              margin="normal"
              label="비밀번호"
              name="password"
              onChange={handleChange}
              type="password"
              required
              fullWidth
              autoComplete="current-password"
            />
            <br />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={login}
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={()=>setOpenFindModal(true)}>
                  <strong>ID/PW 찾기</strong>
                </Link>
              </Grid>
              <Grid item xs>
                <Link to="/SignUp">
                  <strong>회원가입</strong>
                </Link>
              </Grid>
            </Grid>
          </div>
        </Box>
        <FindModal openFindModal={openFindModal} handleCloseWithReset={handleCloseWithReset}/>
      </div>
    );
  }
}

export default LoginPage;
