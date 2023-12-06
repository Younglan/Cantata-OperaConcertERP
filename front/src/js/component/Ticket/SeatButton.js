import { ToggleButton } from "@mui/material";
import React, {  useState } from "react";
import styled from "@emotion/styled";
import seatClass from "./seatClass";


function SeatButton(props){
    const [selected, setSelected] = useState(false);
    const styleSeat = seatClass(props);
    const seatnum = `${props.seatrow}${props.seatline}`;
    return (
      <React.Fragment key={seatnum}>

        <Toggle
          value={seatnum}
          selected={selected}
          key={seatnum}
          disabled={props.seat.includes(seatnum)}
          onChange={() => {
              if(props.disabled!==true){
                setSelected(props.seatChange(selected,seatnum,styleSeat[0]));
                

              }
          }}
          sx={styleSeat[1]}>
              {props.seatline}
          </Toggle>
        </React.Fragment>
    );
  }
  
  export default React.memo(SeatButton);

  const Toggle = styled(ToggleButton)({
    '&:hover': {
      backgroundColor: '#ffffff',
      color:"black",
      boxShadow: 'none',
    },
    '&:active': {
      backgroundColor: '#363434',
      boxShadow: 'none',
    },
      "&.Mui-selected, &.Mui-selected:hover": {
        color:"white",
        backgroundColor: '#141212'
      }
    });