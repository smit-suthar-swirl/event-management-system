import React, { useCallback, useEffect, useState } from 'react'
import { bookUnBookRemoveRegisteredUserInEvents, getSingleEvent } from '../services/api';
import { useLocation } from 'react-router-dom';
import { useIsAuthenticated, useRoleCheck } from '../utilFunctions';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const SingleEvent = () => {
    const [eventData, setEventData] = useState({})
    const userId = useSelector(state => state.auth?.user?._id)

    const role = useRoleCheck()
    const isAuthenticated = useIsAuthenticated()
    const urlpath = useLocation().pathname;
    const eventId = urlpath.split("/").pop();

    const handleBookOrRemoveRegisterdUser = useCallback(async (userId) => {
        try {
            const data = await bookUnBookRemoveRegisteredUserInEvents(eventId, userId);
            if (data) {
                toast.success("Registered successfully");
                window.location.reload()
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    }, [eventId]);

    const isUserRegistered = eventData?.usersRegistered?.some(user => user._id === userId);

    useEffect(() => {
        try {
            const getFunc = async () => {
                const data = await getSingleEvent(eventId)
                if (data) {
                    setEventData(data)
                }
            }
            getFunc()
        } catch (error) {
            console.log(error);
        }

    }, [eventId, handleBookOrRemoveRegisterdUser])
    return (
        <div >
            <div className=" single_event_bg text-white text-center">
                <div className='layer_single_event_bg'>
                    <div className="container p-5">
                        <h1 className="display-4 pt-5"><b>{eventData.title}</b></h1>
                    </div>
                </div>
            </div>


            <div className="container mt-5 pb-5">
                <div className="row">
                    <div className="col-md-6">
                        <img src={eventData.image} alt="Event" className="img-fluid" />
                    </div>
                    <div className="col-md-6">
                        <h2>Event Details</h2><hr />
                        <p className="lead">Date : {eventData.time} </p>
                        <p className="lead">Venue :  {eventData.location}</p>
                        {isAuthenticated && role === "user" && (<>
                            <button className='btn btn-primary' onClick={() => handleBookOrRemoveRegisterdUser(userId)} >{isUserRegistered ? "Booked (click for unbook)" : "Book this event"}</button>
                        </>)}

                        {isAuthenticated && role === "admin" && (
                            <>
                                <h3 className='text-muted'>Users registered</h3><hr />
                                {eventData?.usersRegistered?.length > 0 ? <>
                                    {eventData.usersRegistered && eventData.usersRegistered.map((el, index) => {
                                        return <div className='card p-3' key={index}>
                                            <div className='row ' style={{ alignItems: "center" }}>
                                                <img className='img_prifile_icon' src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png' alt='profile' />
                                                <h5 className='card-title mt-1 ml-3'>{el.username}</h5>
                                                <button className='btn btn-sm btn-danger ml-auto mr-3' onClick={() => handleBookOrRemoveRegisterdUser(el._id)}>remove</button>
                                            </div>
                                        </div>
                                    })}
                                </> : <p className='text-muted text-center'>No users registerd yet</p>}
                            </>
                        )}


                    </div>

                </div>

            </div>
        </div>
    )
}

export default SingleEvent