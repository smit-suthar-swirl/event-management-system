import React from 'react';
import { Route } from 'react-router-dom';
import CreateEvent from '../pages/CreateEvent';
import EventList from '../pages/EventList';

const AfterNormalLoginRoutes = () => {
    return (
        <>
            <Route path="/admin/create-event" element={<CreateEvent />} />
            <Route path="/admin/events" element={<EventList />} />
        </>
    );
};

export default AfterNormalLoginRoutes;
