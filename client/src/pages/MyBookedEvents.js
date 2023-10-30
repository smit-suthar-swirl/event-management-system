import React, { useEffect, useState } from 'react'
import { bookUnBookRemoveRegisteredUserInEvents, getMyBookedEvents } from '../services/api'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const MyBookedEvents = () => {
    const [myBookedEvents, setMyBookedEvents] = useState([])
    const userId = useSelector(state => state.auth?.user?._id)
    useEffect(() => {
        const fetchData = async () => {
            await getMyBookedEvents(userId).then((res) => {
                setMyBookedEvents(res)
            }).catch((err) => {
                console.log(err);
            })
        }
        fetchData()
    }, [userId])

    const handleBookOrRemoveRegisterdUser = async (eventId) => {
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
    }
    console.log(myBookedEvents);
    return (
        <>
            <div className='m-5'>
                <h3 className='text-muted'>Booked events</h3><hr />
                {myBookedEvents.length > 0 ?
                    <>
                        <div className='card p-2'>
                            {myBookedEvents && myBookedEvents.map((el, index) => {
                                return <div className='card mb-2 p-3' key={index}>
                                    <div className='row ' style={{ alignItems: "center" }}>
                                        <img className='img_prifile_icon' src={el.image} alt='profile' />
                                        <h5 className='card-title mt-2 ml-3'>{el.title}</h5> <span className='text-muted pl-2'>({el.time})</span>
                                        <button className='btn btn-sm btn-danger ml-auto mr-3' onClick={() => handleBookOrRemoveRegisterdUser(el._id)} >remove</button>
                                    </div>
                                </div>
                            })}
                        </div>
                    </> : <p className='text-muted text-center'>No events booked yet</p>}

            </div>
        </>
    )
}

export default MyBookedEvents