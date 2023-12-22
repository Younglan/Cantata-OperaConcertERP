import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import "./FindId.css";
import { Typography } from "@mui/material";
import { useState } from "react";


function FindId() {
  const [tel, setTel] = useState("");
  const [code, setCode] = useState("");
 
  const handleSmsSend = async () => {
    try {
      const response = await fetch(
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
    if (response.status === 200) {
      getFindId();
    } else {
      // setIsSmsVerified(false); // 인증 실패
      // setSmsError("인증 번호가 일치하지 않습니다."); // 에러 메시지 설정
    }
  } catch (error) {
    // setIsSmsVerified(false); // 인증 실패
    // setSmsError("인증 실패. 다시 시도해주세요."); // 에러 메시지 설정
  }
};
const getFindId = async ()=>{
  try {
    const response = await fetch(
      `http://localhost:8090/findid/?tel=${tel}`
    );
    const data = await response.json();
    console.log(data);
    alert("아이디 : " + data.id.replace(data.id.substring(1,3),"**"));
  } catch (error) {
    // setIsSmsVerified(false); // 인증 실패
    // setSmsError("인증 실패. 다시 시도해주세요."); // 에러 메시지 설정
  }
};
  return (
    <div className="find_content">
      <div className="find_form">
      <Typography component="h1" variant="h5" textAlign={"center"}>
       <strong>아이디 찾기</strong>
      </Typography>
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
          <Button  variant="contained" onClick={checkSms} sx={{width:"50%"}}>아이디 찾기</Button>
        </div>
      </div>
    </div>
  );
}
export default FindId;
