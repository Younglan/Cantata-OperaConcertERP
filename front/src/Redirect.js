import React from 'react';
import { Navigate } from 'react-router-dom';

const Redirect = ({ authenticated, component:Component}) => {

    return(
        authenticated?Component:<Navigate to="/login" {...alert("로그인이 필요합니다.")}></Navigate>
    )
}

export default Redirect;