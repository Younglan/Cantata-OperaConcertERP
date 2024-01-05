import { TextField } from "@mui/material";
import "./ChangeInformation.css";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function ChangeInformation() {
    const [ userdata, setUserdata ] =useState("");
    const [pwd, setPwd] = useState("");
    const [repwd, setRePwd] = useState("");
    const navigate = useNavigate();
    const fetchUserData = () => {
      const token = sessionStorage.getItem("jwt");
        fetch("http://localhost:8090/user/info", {
          headers: { 'Authorization' : token}
      })
          .then(response => response.json())
          .then(data => setUserdata(data))
          .catch((e) => console.log(e));
      };
    const updatePassword = () =>{
      if(pwd!==null){
      
      const token = sessionStorage.getItem("jwt");
        fetch(`http://localhost:8090/user/pwdchange/?pwd=${pwd}`, {
          method: "POST",
          headers: { 'Authorization' : token}
      })
          
          .catch((e) => console.log(e));
          navigate("/login");
    }else{
      navigate("/");
    }
    };

    useEffect(() => {
      fetchUserData();
      }, []);

  return (
    <div className="cf_content">
      <Typography component="h1" variant="h5" textAlign={"center"}>
        개인정보 수정
      </Typography>
      <div className="changeForm">
        <div className="formGroup1">
          <div
            style={{ textAlign: "left" }}
            className="MuiFormControl-root MuiTextField-root textGroup css-1u3bzj6-MuiFormControl-root-MuiTextField-root"
          >
            아이디
          </div>
          <TextField  className="textGroup" value={userdata.id} disabled>
            아이디
          </TextField>
          <div
            style={{ textAlign: "left" }}
            className="MuiFormControl-root MuiTextField-root textGroup css-1u3bzj6-MuiFormControl-root-MuiTextField-root"
          >
            비밀번호
          </div>
          <TextField label="변경할 비밀번호" type="password" className="textGroup" onChange={(e)=>setPwd(e.target.value)}>
            변경할 비밀번호
          </TextField>
          
          <TextField label="변경할 비밀번호 확인" type="password" className="textGroup" onChange={(e)=>setRePwd(e.target.value)}>
            변경할 비밀번호 확인
          </TextField>
          <div
            style={{ textAlign: "left" }}
            className="MuiFormControl-root MuiTextField-root textGroup css-1u3bzj6-MuiFormControl-root-MuiTextField-root"
          >
            이름
          </div>
          <TextField className="textGroup" value={userdata.username} disabled>
            이름
          </TextField>
          <div
            style={{ textAlign: "left" }}
            className="MuiFormControl-root MuiTextField-root textGroup css-1u3bzj6-MuiFormControl-root-MuiTextField-root"
          >
            생년월일
          </div>
          <TextField  className="textGroup" value={userdata.birth} disabled>
            생년월일
          </TextField>
        </div>
        <div className="formGroup2">
        <div
            style={{ textAlign: "left"}}
            className="MuiFormControl-root MuiTextField-root textGroup css-1u3bzj6-MuiFormControl-root-MuiTextField-root"
          >
            전화번호
          </div>
          <TextField  className="textGroup" value={userdata.tel} disabled>
            전화번호
          </TextField>
          <div
            style={{ textAlign: "left" }}
            className="MuiFormControl-root MuiTextField-root textGroup css-1u3bzj6-MuiFormControl-root-MuiTextField-root"
          >
            이메일
          </div>
          <TextField  className="textGroup" value={userdata.email} disabled>
            이메일
          </TextField>
          <div
            style={{ textAlign: "left" }}
            className="MuiFormControl-root MuiTextField-root textGroup css-1u3bzj6-MuiFormControl-root-MuiTextField-root"
          >
            주소
          </div>
          <TextField  className="textGroup" value={userdata.address} disabled>
            주소
          </TextField>
          <div className="MuiFormControl-root MuiTextField-root textGroup css-1u3bzj6-MuiFormControl-root-MuiTextField-root">
            <Button className="changeInfoButton"
              variant="contained"
              onClick={()=>navigate("/addcorp",{state:{userdata}})}
              sx={{ marginTop:"50px",width:"100%",height:"50px"}}
            >
              <strong>법인 추가</strong>
            </Button>
          </div>
          
        </div>
      </div>
      <div className="clickform">
        <Button className="changeInfoButton"
          variant="contained"
          onClick={()=>updatePassword()}
          //   sx={{ mt: 3, mb: 2 }}
          disabled={pwd===""?true:pwd!==repwd?true:false}
        >
          정보 수정 완료
        </Button>
      </div>
    </div>
  );
}
export default ChangeInformation;
