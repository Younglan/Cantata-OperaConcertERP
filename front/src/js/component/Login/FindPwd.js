import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import "./FindId.css";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function FindPwd() {
  const [id, setId] = useState("");
  const [tel, setTel] = useState("");
  const [code, setCode] = useState("");
  const [changePwd,setChangePwd] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const navigate = useNavigate();
  const handleSmsSend = async () => {
    try {
      await fetch(
        `http://localhost:8090/tel/?tel=${tel}`
      );
      // setSmsInputActive(true); // SMS 입력이 활성화됨
    } catch (error) {
      console.error("SMS 발송 에러:", error);
    }
  };
  const checkSms = async () => {
    
  try {
    
    const response = await fetch(
      `http://localhost:8090/verify/?tel=${tel}&code=${code}`
    );
    
    
    if (response.status===200) {
      
      setChangePwd(true);
    } else {
      // setIsSmsVerified(false); // 인증 실패
      // setSmsError("인증 번호가 일치하지 않습니다."); // 에러 메시지 설정
    }
  } catch (error) {
    // setIsSmsVerified(false); // 인증 실패
    // setSmsError("인증 실패. 다시 시도해주세요."); // 에러 메시지 설정
  }
};

const changePassword = async ()=>{
  const token = sessionStorage.getItem("jwt");
  try {
    await fetch(
      `http://localhost:8090/member/pwdchan/?id=${id}&pwd=${pwd}`, {
        headers: { 'Authorization' : token}
    }
    );
   navigate("/")
    
  } catch (error) {
    // setIsSmsVerified(false); // 인증 실패
    // setSmsError("인증 실패. 다시 시도해주세요."); // 에러 메시지 설정
  }
};
  if(!changePwd){
    return (
      <div className="find_content">
        <div className="find_form">
        
        <Typography component="h1" variant="h5" textAlign={"center"}>
        <strong>비밀번호 찾기</strong>
        </Typography>
          <div className="items">
            <TextField style={{width : "400px"}} label="아이디" onChange={(e)=>setId(e.target.value)}>전화번호 입력</TextField>
          </div>
          <div className="items">
            <TextField style={{width : "400px"}} label="전화번호" onChange={(e)=>setTel(e.target.value)}>전화번호 입력</TextField>
          </div>
          <div className="items">
            <Button variant="contained" onClick={handleSmsSend} sx={{width:"50%"}}>인증번호 전송</Button>
          </div>
          <div className="items">
            <TextField style={{width : "400px"}} label="인증번호" onChange={(e)=>setCode(e.target.value)}> 인증번호 입력</TextField>
          </div>{" "}
          <div className="items">
            <Button  variant="contained" onClick={checkSms} sx={{width:"50%"}}>확 인</Button>
          </div>
        </div>
      </div>
    );
  }else{
    return (
      <div className="find_content">
        <div className="find_form">
        
        <Typography component="h1" variant="h5" textAlign={"center"}>
        <strong>비밀번호 변경</strong>
        </Typography>
          <div className="items">
            <TextField type="password" style={{width : "400px"}} label="비밀번호" value={pwd} onChange={(e)=>setPwd(e.target.value)}></TextField>
          </div>
          <div className="items">
            <TextField type="password" style={{width : "400px"}} label="비밀번호 확인" value={pwdConfirm} onChange={(e)=>setPwdConfirm(e.target.value)}></TextField>
          </div>
          
          
          <div className="items">
            <Button  variant="contained" disabled={pwd===""?true:pwd===pwdConfirm?false:true} onClick={changePassword} sx={{width:"50%"}}>확 인</Button>
          </div>
        </div>
      </div>
    );
  }
}
export default FindPwd;
