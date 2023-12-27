import React from 'react';
import { Navigate } from 'react-router-dom';

const Redirect = ({component:Component}) => {
    const token = sessionStorage.getItem("jwt");
    return(
        token?Component:<Navigate to="/login" {...alert("로그인이 필요합니다.")}></Navigate>
    )
}

export default Redirect;