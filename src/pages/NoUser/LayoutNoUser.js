import { Redirect, Route } from "react-router-dom"; 

import Login from "../Login";

import './LayoutNoUser.scss';

export default function LayoutNoUser(){
    console.log('sptmdr');
    return (
        <>
            <Route path="/login" component={Login}/>
            <Redirect to="/login"/>
        </>
    )
}