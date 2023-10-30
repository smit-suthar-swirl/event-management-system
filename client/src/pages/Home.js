import React, { useEffect } from 'react'
import HomeSlider from '../components/HomeSlider'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../services/api';
import { setAllEvents } from '../features/eventSlice';

const Home = () => {

  const data = useSelector(state => state?.event?.events)

  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllEvents();
        dispatch(setAllEvents(data))
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData()
  }, [dispatch])

  return (
    <>
      <HomeSlider />
      <div className='my-5 mx-5'>
        <h1 className='text-muted'>Events</h1>
        <hr />
        <div className='row'>
          {data && data.map((el, index) => {
            return <Link to={`/single-event/${el._id}`} className='col-lg-4 mb-4'>
              <div >
                <div className='card'>
                  <img class="card-img-top" className='event_card_img' src={el.image} alt="Card-event-cap" />
                  <div className='card-body'>
                    <div className='row'>
                      <h5 class="card-title">{el.title}</h5>
                      <p class="text-muted ml-auto">{el.time}</p>
                    </div>
                  </div>

                </div>
              </div>
            </Link>
          })}
        </div>
      </div>
    </>
  )
}

export default Home