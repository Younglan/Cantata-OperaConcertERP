
import { Modal, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import FindId from "./FindId";
import { useState } from "react";
import FindPwd from "./FindPwd";
// import style from './FindModal.css';

function FindModal({openFindModal, handleCloseWithReset}) {
  const [change, setChange] = useState(true);


  return (
    <Modal
        open={openFindModal}
        onClose={handleCloseWithReset}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="container" // Apply the container style
        sx={{display: "flex",
            alignItems: "center",
            justifyContent: "center"}}
    >
        <Stack className="modalStack"sx={{width: "50%",
    backgroundColor: "white",
    padding: "20px",
    outline: "none",
    borderRadius: "5px"}}> {/* Apply the modalStack style */}
            <Stack direction="row" spacing={2} className="tabButtons" sx={{display: "flex"}}> {/* Apply the tabButtons style */}
                <Button
                    onClick={() => setChange(true)}
                    className="tabButton" // Apply the tabButton style
                    sx={{fontSize: "20px",
                        color: "#a38ced",
                        fontWeight: "bold",
                        width:"50%"}}
                >
                    아이디 찾기
                </Button>
                <Button
                    onClick={() => setChange(false)}
                    className="tabButton" // Apply the tabButton style
                    sx={{fontSize: "20px",
                        color: "#a38ced",
                        fontWeight: "bold",
                        width:"50%"}}
                >
                    비밀번호 찾기
                </Button>
            </Stack>
            <hr />
            {change?<FindId/>:<FindPwd/>}
        </Stack>
    </Modal>
);
}
export default FindModal;
