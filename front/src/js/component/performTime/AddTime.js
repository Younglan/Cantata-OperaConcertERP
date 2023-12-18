import React, { useState} from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment/moment';
import ko from "date-fns/locale/ko";
import './AddTime.css';


function AddTime(props){
    const [date, setDate] = useState();
    const { sendPfCode, sendPfStart, sendPfEnd  } = props;
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState({
        ptDate:'',
        pfCode:sendPfCode
    });
    //모달폼 열기 
    const handleClickOpen = () => {
        setOpen(true);
    };
    //모달 폼 닫기 
    const handleClose = () => {
        setOpen(false);
    }
    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        const formatDate = new Date(moment(selectedDate).format("YYYY-MM-DD HH:mm"));
        console.log(formatDate);
        setTime({ ...time, ptDate: formatDate });
    }
    const handleSave = () => {
        props.addTime(time);
        handleClose();
    }
    return(
        <div >
            <button onClick={handleClickOpen}>새 회차 등록</button>
            <Dialog open={open} onClose={handleClose} maxWidth="xl" className="addTimeform">
                <DialogTitle>새로운 회차</DialogTitle>
                <DialogContent>
                    일시 선택
                    <DatePicker
                        showTimeSelect
                        locale={ ko }
                        dateFormat='yyyy-MM-dd HH:mm' // 날짜 형태
                        shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                        minDate={new Date(sendPfStart)} // minDate 이전 날짜 선택 불가
                        maxDate={new Date(new Date(sendPfEnd).getTime() + 86400000)} // maxDate 이후 날짜 선택 불가
                        selected={date}
                        onChange={handleDateChange}
                    />
                    {/* <MobileDatePicker
                        showHeader={true}
                        confirmText="확인"
                        cancelText="취소"
                        locale={ko}
                        dateConfig={{
                            year: "YYYY",
                            month: "MM",
                            day: "DD",
                            hour: "HH",
                            minute: "mm",
                        }}
                        value={date}
                        onSelect={(date) => handleDateChange(date)}
                        /> */}
                       
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddTime;