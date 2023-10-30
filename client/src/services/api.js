import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rich-rose-antelope-suit.cyclic.app/api', // Replace with your server's URL
});
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const createEvent = async (eventdata) => {
  try {
    const response = await api.post('/events/create-event', eventdata, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure this header is set
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getAllEvents = async () => {
  try {
    const response = await api.get('/events/get-events');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleEvent = async (eventID) => {
  try {
    const response = await api.get(`/events/get-single-event/${eventID}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLastThreeEvents = async () => {
  try {
    const response = await api.get('/events/get-last-three-events');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await api.delete(`/events/delete-event/${eventId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const bookUnBookRemoveRegisteredUserInEvents = async (eventId, userId) => {
  try {
    const response = await api.post(`/events/book-event/${eventId}/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMyBookedEvents = async (userId) => {
  try {
    const response = await api.get(`/events/registered/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};





