import React, { useState } from 'react';
import { createEvent } from '../services/api';
import { toast } from 'react-toastify';

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        title: '',
        time: '',
        location: '',
        image: null,
    });

    const [isLoading, setIsLoading] = useState(false);

    // Function to handle changes in the form fields
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({
                ...formData,
                [name]: files[0], // Use the first selected file
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const clearFileInput = () => {
        setFormData({
            ...formData,
            image: null, // Clear the selected file
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true); // Set loading state to true

        // Create a copy of the current state
        const currentFormData = { ...formData };

        // Create a new FormData object and append the data from the copied state
        const newFormData = new FormData();
        for (const key in currentFormData) {
            if (currentFormData[key] !== null) {
                newFormData.append(key, currentFormData[key]);
            }
        }
        console.log(newFormData);
        try {
            await createEvent(newFormData).then((res) => {
                e.target.reset();
                toast.success(res.message);
                setFormData({
                    title: '',
                    time: '',
                    location: '',
                    image: null,
                });
            }).catch((error) => {
                toast.error(error?.response?.data?.message);
            }).finally(() => {
                setIsLoading(false)
            })
        } catch (error) {
            // Handle the error
            setIsLoading(false)
            console.log(error);
            toast.error("Something went wrong")
        }
    };
    console.log(formData);
    return (
        <div className='main_div_wrapper'>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 card p-5 offset-md-2 mt-4">
                        <h2>Create Event</h2>
                        <hr />
                        <form onSubmit={handleSubmit} className="pt-3">
                            <div className="form-group">
                                <label htmlFor="title">Event Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    placeholder="Enter event title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="time">Event Time</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="time"
                                    name="time"
                                    placeholder="Enter event time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">Event Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="location"
                                    name="location"
                                    placeholder="Enter event location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Event Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="image"
                                    name="image"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {formData.image && (
                                <div className="form-group">
                                    <button type="button" onClick={clearFileInput}>Clear Image</button>
                                </div>
                            )}

                            <button type="submit" className={`btn btn-${isLoading ? "success" : "primary"} float-right`}>
                                {isLoading ? <>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Creating...
                                </> : "Create"}
                            </button>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default CreateEvent;
