import React, { useEffect, useState } from "react";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import DaumPostcode from "react-daum-postcode";
import { Typography } from "@mui/material";
// import axios from "axios";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { ButtonGroup } from "@mui/material";

import "./SignUp.css";
import { Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";


function SignUp() {
  const [formdata, setFormData] = useState({gender:"MALE"});
  const [addrall, setAddrall] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const submitList = [
    "address",
    "birth",
    "email",
    "gender",
    "id",
    "password",
    "tel",
    "username",
  ];
  const [isSmsVerified, setIsSmsVerified] = useState(false);
  const [smsError, setSmsError] = useState("인증이 되지 않았습니다.");
  const [isSmsBtnActive, setSmsBtnActive] = useState(false);
  const [isSmsInputActive, setSmsInputActive] = useState(false);
  const [userSmsInput, setUserSmsInput] = useState("");
  const [addropen, setAddropen] = useState(false);
  const [submit, setSubmit] = useState(true);
  useEffect(() => {
    console.log(formdata);
    handleSubmit();
  }, [formdata]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(formdata);
    setFormData(
      name === "addr_dtl"
        ? { ...formdata, address: `${addrall} ${value}` }
        : {
            ...formdata,
            [name]: value,
          }
    );
  };
  const handlePasswordChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const [errors, setErrors] = useState("");
  // const [passwordConfirm, setPasswordConfirm] = useState("");

  //post
  const postSignUp = () => {
    console.log(formdata);
    fetch("http://localhost:8090/login/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    })
     
      .then((response) => {
        console.log(response)
        if (response.ok) {
          navigate("/Login");
        } else {
        }
      })
      .catch((e) => console.log(e));
  };

  //주소 + 상세주소 합치기
  const addrCombine = (e) => {
    setAddrall(e.target.value);
    // handleInputChange(e);
  };

  //회원가입 상태에 저장된 데이터 유효성검사
  const validate = (name, value) => {
    let error = null;

    switch (name) {
      case "id":
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
          error = "아이디는 영어, 숫자만 사용 가능합니다.";
        }
        break;
      case "password":
        if (
          !/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+).{8,15}$/.test(
            value
          )
        ) {
          error =
            "비밀번호는 영어, 숫자, 특수문자를 포함하여 8~15 자리로 만들어 주세요..";
        }
        break;
      case "username":
        if (!/^[a-zA-Z가-힣]+$/.test(value)) {
          error = "이름은 한글, 영어만 사용 가능합니다.";
        }
        break;
      case "birth":
        const birthYear = new Date(value).getFullYear();
        if (new Date(value) > new Date() || birthYear < 1900) {
          error = "유효하지 않은 날짜입니다.";
        }
        break;
      case "tel":
        if (!/^\d{11,12}$/.test(value)) {
          error = "전화번호는 11~12자리 숫자만 가능합니다.";
        }
        break;
      case "email":
        if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
          error = "유효하지 않은 이메일 형식입니다.";
        }
        break;
      case "passwordConfirm":
        if (passwordConfirm !== formdata.password) {
          error = "비밀번호가 일치하지 않습니다.";
        }
        break;
      default:
        break;
    }

    return error;
  };

  //핸드블러가 실행될때 상태
  const handleBlur = async (e) => {
    const { name, value } = e.target;
    handleSubmit();
    //SMS 인증 코드 확인
    if (name === "smsInput") {
      try {
        const response = await fetch(
          `http://localhost:8090/verify/?tel=${formdata.tel}&code=${value}`
        );
        if (response.status === 200) {
          setIsSmsVerified(true); // 인증 성공
          setSmsError(null); // 에러 메시지를 null로 설정
        } else {
          setIsSmsVerified(false); // 인증 실패
          setSmsError("인증 번호가 일치하지 않습니다."); // 에러 메시지 설정
        }
      } catch (error) {
        setIsSmsVerified(false); // 인증 실패
        setSmsError("인증 실패. 다시 시도해주세요."); // 에러 메시지 설정
      }
      return; // 이 부분이 실행되면 아래의 코드는 실행되지 않습니다.
    }

    const error = validate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

    //
    if (error) return;

    //중복검사
    const checkDuplicate = async (type, errorMsg) => {
      try {
        const response = await fetch(
          `http://localhost:8090/Duple/?type=${type}&value=${value}`
        );
        const data = await response.json();
        if (data) {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));

          // 만약 전화번호가 유효하고 중복이 아니라면, SMS 버튼을 활성화
          if (name === "tel") {
            setSmsBtnActive(true);
          }
        }
      } catch (error) {
        console.error(`${name} 중복 체크 중 오류:`, error);
      }
    };

    switch (name) {
      case "id":
        checkDuplicate("id", "이미 사용중인 아이디입니다.");
        break;
      case "email":
        checkDuplicate("email", "이미 사용중인 이메일입니다.");
        break;
      case "tel":
        checkDuplicate("tel", "이미 사용중인 전화번호입니다.");
        break;
      default:
        break;
    }
  };

  const handleSmsSend = async () => {
    try {
      const response = await fetch(
        `http://localhost:8090/tel/?tel=${formdata.tel}`
      );
      console.log(response);
      setSmsInputActive(true); // SMS 입력이 활성화됨
    } catch (error) {
      console.error("SMS 발송 에러:", error);
    }
  };
  const handleSmsInputChange = (e) => {
    setUserSmsInput(e.target.value); // 사용자가 입력한 값을 상태에 저장
  };
  const handleAddrClose = () => {
    setAddropen(!addropen);
  };

  const handleSubmit = async () => {
    // 상태 검사
    // 유효성 검사
    for (const key in formdata) {
      if (submitList.includes(key)) {
        const error = validate(key, formdata[key]);
        console.log(error);
        if (error) {
          setErrors((prevErrors) => ({ ...prevErrors, [key]: error }));
          setSubmit(true);
          console.log("호환성확인");
          return;
        }
      } else {
        console.log("중복체크확인");
        setSubmit(true);
        return;
      }
    }

    if (!isSmsVerified) {
      setSmsError("SMS 인증을 완료해주세요.");
      console.log("휴대폰인증");
      setSubmit(true);
      return;
    }
    
    if (formdata.password !== passwordConfirm) {
      console.log("비밀번호중복");
      setSubmit(true);
      return;
    }
    console.log("aaa");
    setSubmit(false);
  };

  return (
    <div className="SignUpForm">
      <div>
        {/* <strong>회원가입</strong> */}
        <Typography component="h1" variant="h5" textAlign={"center"}>
          회원가입
        </Typography>
        <div className="textGroup">
          <TextField
            label="아이디"
            name="id"
            fullWidth
            // value={formData.memId}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder=" "
            required
            style={{ borderColor: errors.memId ? "red" : "" }} // 여기서 스타일을 추가합니다.
            sx={{ mt: 3, mb: 1 }}
          />
        </div>
        <div>
          {errors.id && <span style={{ color: "red" }}>{errors.id}</span>}
        </div>
        <div className="textGroup">
          <TextField
            label="비밀번호"
            type="password"
            name="password"
            fullWidth
            // value={formData.pwd}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder=" "
            required
            style={{ borderColor: errors.pwd ? "red" : "" }}
            sx={{ mt: 3 }}
          />
        </div>
        <div>
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password}</span>
          )}
        </div>
        <div className="textGroup">
          <TextField
            label="비밀번호 확인"
            type="password"
            name="passwordConfirm"
            fullWidth
            // value={formdata.passwordConfirm}
            onChange={handlePasswordChange}
            onBlur={handleBlur} // 기존의 handleBlur 함수를 재사용할 수 있습니다.
            placeholder=" "
            required
            style={{ borderColor: errors.passwordConfirm ? "red" : "" }}
            sx={{ mt: 1, mb: 1 }}
          />
        </div>
        <div>
          {errors.passwordConfirm && (
            <span style={{ color: "red" }}>{errors.passwordConfirm}</span>
          )}
        </div>
        <div className="textGroup">
          <TextField
            label="이름"
            name="username"
            // value={formData.name}
            fullWidth
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder=" "
            required
            style={{ borderColor: errors.name ? "red" : "" }}
            sx={{ mt: 2, mb: 0.5 }}
          />
        </div>
        <div>
          {errors.username && (
            <span style={{ color: "red" }}>{errors.username}</span>
          )}
        </div>
        <div className="textGroup">
          <TextField
            type="date"
            name="birth"
            // value={formData.bir}
            fullWidth
            onChange={handleInputChange}
            // onBlur={handleDateInputBlur}
            required
            style={{ borderColor: errors.bir ? "red" : "" }}
            sx={{ mt: 2, mb: 1 }}
          />
        </div>
        <div className="genbtn" sx={{ mt: 2, mb: 1 }}>
          {/* <select
            name="gender"
            // value={formData.gender}
            onChange={handleInputChange}
            required
            fullWidth
          >
            <option value="">성별 선택</option>
            <option value="MALE">남성</option>
            <option value="FEMALE">여성</option>
          </select> */}

          {/* <Button fullWidth variant="contained" onClick={handleGenderChange} value="MALE" sx={formdata.gender!=="MALE"?{color:"black"}:{color:"white"}}><strong>남성</strong></Button> */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleInputChange}
            name="gender"
            value="MALE"
            sx={{
              margin: "0 3px", 
              backgroundColor: formdata.gender !== "MALE" ? "gray" : "#4B89DC",
              color: "white",
              fontSize:"18px",
              '&:hover': {
                backgroundColor: '#6DABFE',
                boxShadow: 'none',
              }
            }}
          >
            <strong>남 성</strong>
          </Button>
          {/* <Button fullWidth variant="contained" onClick={handleGenderChange} value="FEMALE" sx={formdata.gender!=="FEMALE"?{color:"black"}:{color:"white"}}>여성</Button> */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleInputChange}
            name="gender"
            value="FEMALE"
            sx={{
              margin: "0 3px",
              backgroundColor: formdata.gender !== "FEMALE" ? "gray" : "#feb9c6",
              color: "white",
              fontSize:"18px",
              '&:hover': {
                backgroundColor: '#ffDBE8',
                boxShadow: 'none',
              }
            }}
          >
            <strong>여 성</strong>
          </Button>
        </div>
        <div className="textGroup">
          <TextField
            label="전화번호"
            name="tel"
            fullWidth
            // value={formData.tel}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder=" "
            required
            style={{ borderColor: errors.tel ? "red" : "" }}
            sx={{ mt: 1, mb: 1 }}
            // disabled={isSmsVerified} // SMS가 검증되면 비활성화
          />
        </div>
        <div>
          {errors.tel && <span style={{ color: "red" }}>{errors.tel}</span>}
        </div>
        <Button
          // type="submit"
          fullWidth
          type="password"
          variant="contained"
          onClick={handleSmsSend}
          disabled={errors.tel || isSmsVerified} // SMS가 검증되거나 전화번호에 에러가 있을 때 비활성화
          sx={{ mt: 1, mb: 1 }}
        >
          인증번호 전송
        </Button>
        <div className="textGroup">
          <TextField
            type="text"
            name="smsInput"
            fullWidth
            value={userSmsInput}
            onChange={handleSmsInputChange}
            onBlur={handleBlur}
            placeholder="인증번호 입력"
            required
            disabled={!isSmsInputActive} // SMS 발송 전에는 비활성화
            sx={{ mt: 1, mb: 1 }}
          />
        </div>
        <div>
          {smsError && <span style={{ color: "red" }}>{smsError}</span>}
        </div>
        <div className="textGroup">
          <TextField
            label="이메일"
            type="email"
            name="email"
            fullWidth
            // value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder=" "
            required
            style={{ borderColor: errors.email ? "red" : "" }}
            sx={{ mt: 2, mb: 1 }}
          />
        </div>
        <div>
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        </div>
        <div className="textGroup">
          <TextField
            name="addr"
            value={addrall || "주소 *"}
            // onChange={addrCombine}
            onClick={() => setAddropen(!addropen)}
            required
            fullWidth
            margin="normal"
          />
        </div>
        <div className="textGroup">
          <TextField
            label="상세주소"
            name="addr_dtl"
            onChange={handleInputChange}
            required
            fullWidth
            margin="normal"
          />
        </div>
        <Button
          // type="submit"
          fullWidth
          variant="contained"
          onClick={postSignUp}
          sx={{ mt: 3, mb: 2 }}
          disabled={submit}
        >
          회원가입
        </Button>
      </div>
      <Dialog open={addropen} onClose={handleAddrClose}>
        <DaumPostcode
          style={{width:"500px", height:"700px"}}
          onComplete={(e) => {
            addrCombine({
              target: { name: "addr", value: `${e.address}` },
            });
            setAddropen(!addropen);
          }}
        ></DaumPostcode>
      </Dialog>
    </div>
  );
}

export default SignUp;
