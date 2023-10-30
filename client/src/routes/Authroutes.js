import React from 'react';
import { Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';


const Authroutes = () => (
    <>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
    </>
);

export default Authroutes;
