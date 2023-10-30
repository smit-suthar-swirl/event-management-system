import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getLastThreeEvents } from '../services/api';
import { setLatestEvents } from '../features/eventSlice';

const HomeSlider = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state?.event?.latestThreeEvents)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await getLastThreeEvents();
                dispatch(setLatestEvents(data))
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [dispatch]);


    return (
        <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
        >
            <ol className="carousel-indicators">
                <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to={0}
                    className="active"
                />
                <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                <li data-target="#carouselExampleIndicators" data-slide-to={2} />
            </ol>
            <div className="carousel-inner">
                {data && data.map((el, index) => {
                    return <div className={`carousel-item  ${index === 0 ? "active" : ""}`}>
                        <Link to={`/single-event/${el._id}`}>
                            <img className="d-block car_img w-100" src={el.image} alt="First slide" />
                            <div class="carousel-caption d-none d-md-block">
                                <h5>{el.title}</h5>
                                <p>{el.time}</p>

                            </div>
                        </Link>
                    </div>
                })}

            </div>
            <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
            </a>
            <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
            </a>
        </div>

    )
}

export default HomeSlider