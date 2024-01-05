import React, { useState} from "react";
import { useNavigate  } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment/moment';
import { format } from 'date-fns';
import ko from "date-fns/locale/ko";
import './AddTime.css';
const SERVER_URL='http://localhost:8090';

function AddTime(props){
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const { sendPfCode, sendPfStart, sendPfEnd,sendPfTitle,sendRunTime,sendPlantNo  } = props;
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [performTime, setPerformTime] = useState({
        ptDate:'',
        ptEndtime:'',
        pfCode:sendPfCode
    });
    const [timesCheck, setTimesCheck] = useState();
    //모달폼 열기 
    const handleClickOpen = () => {
        setDate(null);
        setTime(null);
        setTimesCheck(null);
        setOpen(true);
    };
    //모달 폼 닫기 
    const handleClose = () => {
        setOpen(false);
    }

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);

        // 선택된 날짜와 시간을 이용하여 일정 중복 체크 함수 호출
        if (selectedDate && time) {
            //선택한 날짜값과 시간값 하나의 데이터로 합치기
            const selectedDateTime = new Date(selectedDate);
            selectedDateTime.setHours(time.getHours(), time.getMinutes());

            timeformatting(selectedDateTime);
        }
    }

    const handleTimeChange = (selectedTime) => {
        setTime(selectedTime);
        // 선택된 날짜와 시간을 이용하여 일정 중복 체크 함수 호출
        if (date && selectedTime) {
            //선택한 날짜값과 시간값 하나의 데이터로 합치기
            const selectedDateTime = new Date(date);
            selectedDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes());
            //일정중복체크 함수 호출
            timeformatting(selectedDateTime);
        }
    }
    // 선택된 날짜와 시간을 이용하여 일정 중복 체크 함수 
    const timeformatting = (selectedDateTime) =>{
            const formatDate = new Date(moment(selectedDateTime).format("YYYY-MM-DD HH:mm"));
            const formatDate2 = format(selectedDateTime, 'yyyy-MM-dd HH:mm', { locale: ko });
            const ptEndtime = new Date(formatDate);
            ptEndtime.setMinutes(ptEndtime.getMinutes() + sendRunTime);
            setPerformTime({ ...performTime, ptDate: formatDate, ptEndtime: ptEndtime});
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
        fetch(SERVER_URL+"/perform_times/findPfCodePtDate?plantNo="+sendPlantNo+"&ptDate="+date+"&ptEndtime="+formatDate)
        .then(response => response.json())
        .then(data => {
            if(data === true ){
                setTimesCheck(null);
            }else{
                setTimesCheck(<div className="timesCheck">해당날짜와 시간에 이미 다른공연이 존재합니다.</div>);
            }
        })
        .catch(err => {
            // console.error(err);
            navigate("/errorPage");
        });
    }

    const renderTimesCheck = () => {
        return <div>{timesCheck}</div>;
    }

    const handleSave = () => {
        if(date === null){
            alert("날짜를 선택하세요");
        }else if(time === null){
            alert("시간을 선택하세요");
        }else if(date && time){
            if(timesCheck !== null){
                alert("날짜와 시간을 다시 선택하세요");
            }else{
                props.addTime(performTime);
                handleClose();
            }
        }
        
        
    }

    return(
        <div>
            <button className='redButton' onClick={handleClickOpen}>새 회차 등록</button>
            <Dialog open={open} onClose={handleClose} className="addTimeform">
                <DialogTitle>[{sendPfTitle}]</DialogTitle>
                <DialogContent className="addTimeformContent">
                    새 회차 일시 선택
                    {/* 첫 번째 DatePicker: 날짜 선택 */}
                    <DatePicker
                        locale={ko}
                        dateFormat='yyyy-MM-dd'
                        selected={date}
                        minDate={Math.max(new Date(), new Date(sendPfStart))} // 둘 중 더 미래의 날짜부터 선택하도록 설정
                        maxDate={new Date(sendPfEnd)} // maxDate 이후 날짜 선택 불가
                        onChange={handleDateChange}
                        className="addTimePicker"
                    />
                    {/* 두 번째 DatePicker: 시간 선택 */}
                    {date && (
                        <DatePicker
                            showTimeSelect
                            showTimeSelectOnly
                            locale={ko}
                            dateFormat='HH:mm'
                            selected={time}
                            onChange={handleTimeChange}
                            className="addTimePicker"
                        />
                    )}
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