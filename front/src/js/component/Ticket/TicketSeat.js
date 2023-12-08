import React from "react";
import SeatButton from "./SeatButton";

import "./css/TicketSeat.css";
// import { TicketContext } from "./Ticket";

function TicketSeat(props){
  const row = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "N", "M"];
  const cenlineLeft = [1, 2, 3, 4];
  const cenlineCenter = [5, 6, 7, 8, 9, 10, 11, 12, 13 ,14, 15, 16]
  const cenlineRight = [17, 18, 19, 20];

  return(
    <div className="SeatMain">
      <div className="SeatStage">
        <img src="./img-theater-screen.png" alt="screen"/>
      </div>
      <div className="SeatAll">
      <div className="SeatLeft">
        <div>
          <SeatButton seatrow="box" seatline={1} seatChange={props.value} seat={props.seat}/><br/>
          <SeatButton seatrow="box" seatline={2} seatChange={props.value} seat={props.seat}/>
        </div>
        <div>
          <SeatButton seatrow="box" seatline={3} seatChange={props.value} seat={props.seat}/><br/>
          <SeatButton seatrow="box" seatline={4} seatChange={props.value} seat={props.seat}/>
        </div>
      </div>
      <div className="SeatCenter">
        <div className="SeatcenRow">
          {row.map((ro,i)=>{
              return (<div className="buttons" key={i}>
                  <SeatButton seatline={ro} disabled={true} seat={props.seat}/>
                </div>);
              }
            )}
        </div>
        <div className="SeatcenLeft">
          {row.map((ro,i)=>{
            return(
              <div className="cenlineLeft" key={i}>
                {cenlineLeft.map((li)=>{
                    return (
                      <React.Fragment key={li}>
                        <SeatButton seatrow={ro} seatline={li} seatChange={props.value} seat={props.seat}/>
                      </React.Fragment>
                    )
                  })}
              </div>
              );
              
            }
          )}
        </div>
        <div className="SeatcenCenter">
          {row.map((ro,i)=>{
            return(
              <div className="cenlineCenter" key={i}>
                {cenlineCenter.map((li)=>{
                  return (
                    <React.Fragment key={li}>
                      <SeatButton seatrow={ro} seatline={li} seatChange={props.value} seat={props.seat}/>
                    </React.Fragment>
                  )
                })}
              </div>
              );  
            }
          )}
        </div>
        <div className="SeatcenRight">
          {row.map((ro,i)=>{
            return(
              <div className="cenlineRight" key={i}>
                {cenlineRight.map((li)=>{
                  return (
                    <React.Fragment key={li}>
                      <SeatButton seatrow={ro} seatline={li} seatChange={props.value} seat={props.seat}/>
                    </React.Fragment>
                  )
                })}
              </div>
              );
            }
          )}
        </div>
      </div>
      <div className="SeatRight">
        <div>
          <SeatButton seatrow="box" seatline={5} seatChange={props.value} seat={props.seat}/><br/>
          <SeatButton seatrow="box" seatline={6} seatChange={props.value} seat={props.seat}/>
        </div>
        <div>
          <SeatButton seatrow="box" seatline={7} seatChange={props.value} seat={props.seat}/><br/>
          <SeatButton seatrow="box" seatline={8} seatChange={props.value} seat={props.seat}/>
        </div>
      </div>
      </div>
    </div>
  );
}

export default React.memo(TicketSeat);