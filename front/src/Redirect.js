import React from 'react';
import { Navigate } from 'react-router-dom';

const Redirect = ({component:Component, auth}) => {
    const token = sessionStorage.getItem("jwt");
    const role = sessionStorage.getItem("role");
    if(token){
        if(auth==="USER"){
            return(
                Component
            )
        }else if(auth===role){
            return(
                Component
            )
        }else{
            return(
            <Navigate to="/" {...alert("관리자 권한이 없습니다.")}></Navigate>
            )
        }
        
    }else{
        return(
        <Navigate to="/login" {...alert("로그인이 필요합니다.")}></Navigate>
        )
    }

}

export default Redirect;