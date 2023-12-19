import React, { useState} from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment/moment';
import { format } from 'date-fns';
import ko from "date-fns/locale/ko";
import './AddTime.css';
const SERVER_URL='http://localhost:8090';

function AddTime(props){
    const [date, setDate] = useState();
    const { sendPfCode, sendPfStart, sendPfEnd,sendPfTitle,sendRunTime  } = props;
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState({
        ptDate:'',
        ptEndtime:'',
        pfCode:sendPfCode
    });
    const [timesCheck, setTimesCheck] = useState();
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
        const formatDate2 = format(selectedDate, 'yyyy-MM-dd HH:mm', { locale: ko });
        const ptEndtime = new Date(formatDate);
        ptEndtime.setMinutes(ptEndtime.getMinutes() + sendRunTime);
        setTime({ ...time, ptDate: formatDate, ptEndtime: ptEndtime});
        //일정중복체크 함수 호출
        timesCheckFunction(formatDate2);
    }

    //일정중복체크 함수
    const timesCheckFunction = (date) => {
        //선택된 날짜에 대한 런타임 계산 및 포맷변경
        let ptEndtime = new Date(date);
        ptEndtime.setMinutes(ptEndtime.getMinutes() + sendRunTime);
        const formatDate = format(ptEndtime, 'yyyy-MM-dd HH:mm', { locale: ko });
        
        //백엔드요청
        fetch(SERVER_URL+"/perform_times/findPfCodePtDate?pfCode="+sendPfCode+"&ptDate="+date+"&ptEndtime="+formatDate)
        .then(response => response.json())
        .then(data => {
            if(data === true ){
                setTimesCheck(null);
            }else{
                setTimesCheck(<div className="timesCheck">해당회차가 이미 있습니다.</div>);
            }
        })
        .catch(err => console.error(err));
    }

    const renderTimesCheck = () => {
        return <div>{timesCheck}</div>;
    }

    const handleSave = () => {
        if(timesCheck !== null){
            alert("날짜를 재선택하세요");
        }else{
            props.addTime(time);
            handleClose();
        }
        
    }

    return(
        <div >
            <button onClick={handleClickOpen}>새 회차 등록</button>
            <Dialog open={open} onClose={handleClose} className="addTimeform">
                <DialogTitle>[{sendPfTitle}]</DialogTitle>
                <DialogContent className="addTimeformContent">
                    새 회차 일시 선택
                    <DatePicker
                        showTimeSelect
                        locale={ ko }
                        dateFormat='yyyy-MM-dd HH:mm' // 날짜 형태
                        shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                        minDate={new Date(sendPfStart)} // minDate 이전 날짜 선택 불가
                        maxDate={new Date(sendPfEnd)} // maxDate 이후 날짜 선택 불가
                        selected={date}
                        onChange={handleDateChange}
                        className="addTimePicker"
                    />
                    {renderTimesCheck()}
                       
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