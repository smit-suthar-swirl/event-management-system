import React from 'react';
import { Route } from 'react-router-dom';
import UserProfile from '../pages/UserProfile';
import MyBookedEvents from '../pages/MyBookedEvents';

const AfterNormalLoginRoutes = () => {
    return (
        <>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/my-booked-events" element={<MyBookedEvents />} />
        </>
    );
};

export default AfterNormalLoginRoutes;
