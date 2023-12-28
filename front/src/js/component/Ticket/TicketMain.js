import React, { useEffect, useState, useContext } from 'react';
import { Typography, ListItem, ListItemButton, ListItemText} from "@mui/material";
import { FixedSizeList } from 'react-window';
import Calendar from 'react-calendar';
import moment from 'moment/moment';




import { leftSeat } from './seatClass';
import 'react-calendar/dist/Calendar.css';
import "./css/TicketMain.css";
import { TicketContext } from './Ticket';
import styled from '@emotion/styled';


function TicketMain(){
    const ticketInfo = useContext(TicketContext);
    const [value, onChange] = useState(""); 
    const [ticdate, setDate] = useState([]);
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [lefseat, setLefSeat] = useState(0);
    const classSeat = ["R","S","A","B","C","D"];
    const leftS = [48, 32, 8, 48, 72, 80];
    const fetchtime = () =>{
      const token = sessionStorage.getItem("jwt");
      if (token){
        fetch("http://localhost:8090/ticket/pftdate",{
          headers: { 
          'Authorization': token
              }})
        .then(response => response.json())
        .then(data => setDate(data.map((it)=>{
          return String(new Date(moment(it).format('YYYY-MM-DD')))
        })))
        .catch(err => console.error(err));
      }
        
        
    };
    
    useEffect(()=>{
        fetchtime();
        
    }, []);
    useEffect(()=>{
        setTime(""); 
    }, [value]);

    const renderRowPerform = (props) => {
        const { index, style } = props;
        return (
          <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton onClick={(event) => onClickTitle(title[index])}>
              <ListItemText primary={`${title[index]}`} />
            </ListItemButton>
          </ListItem>
        ); 
      };

      const renderRowTime = (props) => {
        const { index, style } = props;
        return (
          <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton onClick={(event) => {
              onClickTime(time[index].pt_no);
              ticketInfo.setTimedate(time[index].pt_date);
            }}>
              <ListItemText primary={moment(time[index].pt_date).format('HH : mm')} style={{textAlign:"center"}}/>
            </ListItemButton>
          </ListItem>
        ); 
      };

      const renderRowSeat = (props) => {
        const { index, style } = props;
        return (
          <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemText primary={`${classSeat[index]}등급 | ${leftS[index]-ticketInfo.seat.filter(element => classSeat[index]===leftSeat(element)).length} 석`} style={{margin:"0 0 0 40px"}}/> 
          </ListItem>
        ); 
      };

    const onChangeClick = (event) =>{
      const token = sessionStorage.getItem("jwt");
        const tmptitle = moment(event).format('YYYY-MM-DD');
        fetch(`http://localhost:8090/ticket/tickdate/?date=${tmptitle}`,{
          headers: { 
          'Authorization': token
              }})
        .then(response => response.json())
        .then(data => setTitle(data))
        .catch(err => console.error(err));
        ticketInfo.setButtonOn(false);
    };
    const onClickTitle = (title) => {
        const tmptitle = moment(value).format('YYYY-MM-DD');
        const token = sessionStorage.getItem("jwt");
        fetch(`http://localhost:8090/ticket/pftime/?date=${tmptitle}&title=${title}`,{
          headers: { 
          'Authorization': token
              }})
        .then(response => response.json())
        .then(data => setTime(data))
        .catch(err => console.error(err));
        ticketInfo.fetchPerformInfo(title);
        ticketInfo.setButtonOn(false);
    };
    const onClickTime = (time) => {
      const token = sessionStorage.getItem("jwt");
      fetch(`http://localhost:8090/ticket/seat/?num=${time}`,{
        headers: { 
        'Authorization': token
            }})
      .then(response => response.json())
      .then(data => ticketInfo.setSeat(data))
      .catch(err => console.error(err));
      setLefSeat(6);
      ticketInfo.setPtno(time);
      ticketInfo.setButtonOn(true);
  };
    return(
        <div className="tick_main">
            <div>
                <Typograph>관람일</Typograph>
                <Calendar 
                    locale="kr"
                    onChange={onChange} 
                    value={value} 
                    next2Label={null}
                    prev2Label={null}
                    minDetail="month"
                    maxDetail="month"
                    defaultView="month"
                    calendarType="gregory"
                    minDate={new Date(ticdate[0])}
                    maxDate={new Date(ticdate[ticdate.length - 1])}
                    formatDay={(locale, date) => moment(date).format('D')}
                    tileDisabled={({date}) => !ticdate.includes(String(new Date(moment(date).format('YYYY-MM-DD'))))}
                    onClickDay={(value) => onChangeClick(value)}
                />
                
            </div>
            <div>
                <Typograph>공연</Typograph>
                <FixedSizeList
                    height={300}
                    width={200}
                    itemSize={46}
                    itemCount={title.length}
                    overscanCount={5}
                    
                >
                    {renderRowPerform}
                </FixedSizeList>
            </div>
            <div>
                <Typograph>시간</Typograph>
                <FixedSizeList
                    height={300}
                    width={200}
                    itemSize={46}
                    itemCount={time.length}
                    overscanCount={5}

                >
                    {renderRowTime}
                </FixedSizeList>
            </div>
            <div>
                <Typograph>잔여석</Typograph>
                <FixedSizeList
                    height={300}
                    width={200}
                    itemSize={46}
                    itemCount={lefseat}
                    overscanCount={6}
                >
                    {renderRowSeat}
                </FixedSizeList>
            </div>
        </div>
    );
}

export default TicketMain;

const Typograph = styled(Typography)(({ theme }) => ({
    fontFamily: 'Nanum Gothic', 
    fontWeight:"bold", 
    fontSize:"20px",
    marginBottom:"10px",
    
  }));