import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    events: [],
    latestThreeEvents: []
};

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setAllEvents: (state, action) => {
            state.events = action.payload
        },
        setLatestEvents: (state, action) => {
            state.latestThreeEvents = action.payload
        }
    },
});


export const { setAllEvents, setLatestEvents } = eventSlice.actions;
export default eventSlice.reducer;
