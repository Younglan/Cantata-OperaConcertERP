const seatClass=(seat)=>{
  const R = ["A","B","C","D",5,6,7,8,9,10,11,12,13,14,15,16];
  const S = ["A","B","C","D",1,2,3,4,17,18,19,20];
  const A = ["box",1,2,3,4,5,6,7,8];
  const B = ["E","F","G","H",5,6,7,8,9,10,11,12,13,14,15,16];
  const C = [5,6,7,8,9,10,11,12,13,14,15,16];
  const D = [1,2,3,4,17,18,19,20];
  if(R.includes(seat.seatrow) && R.includes(seat.seatline)){
    return ["R",{
      height:"5px",
      width:"5px",
      backgroundColor:"#4d377b",
      border:"1px solid gray",
      color:"white",
      '&:disabled': {
        backgroundColor: "#808080",
      }
    }]
  }else if(S.includes(seat.seatrow) && S.includes(seat.seatline)){
    return ["S",{
      height:"5px",
      width:"5px",
      backgroundColor:"#79EDFF",
      border:"1px solid gray",
      color:"white",
      '&:disabled': {
        backgroundColor: "#808080",
      }
    }]
  }else if(A.includes(seat.seatrow) && A.includes(seat.seatline)){
    return ["A",{
      height:"5px",
      width:"5px",
      backgroundColor:"#3CB371",
      border:"1px solid gray",
      color:"white",
      '&:disabled': {
        backgroundColor: "#808080",
      }
    }]
  }else if(B.includes(seat.seatrow) && B.includes(seat.seatline)){
    return ["B",{
      height:"5px",
      width:"5px",
      backgroundColor:"#FF7F00",
      border:"1px solid gray",
      color:"white",
      '&:disabled': {
        backgroundColor: "#808080",
      }
    }]
  }else if(C.includes(seat.seatline)){
    return ["C",{
      height:"5px",
      width:"5px",
      backgroundColor:"#E9BD15",
      border:"1px solid gray",
      color:"white",
      '&:disabled': {
        backgroundColor: "#808080",
      }
    }]
  }else if(D.includes(seat.seatline)){
    return ["D",{
      height:"5px",
      width:"5px",
      backgroundColor:"#964B00",
      border:"1px solid gray",
      color:"white",
      '&:disabled': {
        backgroundColor: "#808080",
      }
    }]
  }else{
    return ["",{
      height:"5px",
      width:"5px",
      border:"2px solid black",
      color:"white",
      fontWeight:"bold"
    
    }]
  }
}

export default seatClass;

export const leftSeat=(seat)=>{
  const R = ["A","B","C","D",5,6,7,8,9,10,11,12,13,14,15,16];
  const S = ["A","B","C","D",1,2,3,4,17,18,19,20];
  // const A = ["box",1,2,3,4,5,6,7,8];
  const B = ["E","F","G","H",5,6,7,8,9,10,11,12,13,14,15,16];
  const C = [5,6,7,8,9,10,11,12,13,14,15,16];
  const D = [1,2,3,4,17,18,19,20];
    if(seat==null){
      return "ts_default"
    }
    const seat_one = seat.substr(0,1);
    const seat_two = Number(seat.substr(1));
    if(R.includes(seat_one) && R.includes(seat_two)){
      return "R"
    }else if(S.includes(seat_one) && S.includes(seat_two)){
      return "S"
    }else if(B.includes(seat_one) && B.includes(seat_two)){
      return "B"
    }else if(C.includes(seat_two)){
      return "C"
    }else if(D.includes(seat_two)){
      return "D"
    }else {
      return "A"
    }
};





