import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, getAllEvents } from '../services/api';
import { toast } from 'react-toastify';
import { setAllEvents } from '../features/eventSlice';

const columns = [
    {
        name: '#', // Row number column
        cell: (row, index) => <div>{index + 1}</div>,
        width: '50px', // Adjust the width to your preference
    },
    {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
    },
    {
        name: 'Date',
        selector: row => row.time,
        sortable: true,
    },
    {
        name: 'Place',
        selector: row => row.location,
        sortable: true,
    },
    {
        name: 'Actions',
        cell: (row) => (
            <div>
                <button className='btn btn-sm btn-primary' onClick={() => handleEdit(row)}>Edit</button>
                <button className='btn btn-sm btn-danger ml-1' onClick={() => handleDelete(row)}>Delete</button>
                {/* Add more buttons as needed */}
            </div>
        ),
    },
];


const handleEdit = () => {
    alert("Working")
}

const handleDelete = async (row) => {
    try {
        await deleteEvent(row._id)
        toast.success("Deleted successfully")
        window.location.reload()
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong!")
    }
}



const EventList = () => {
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
    }, [dispatch, handleDelete])


    return (
        <div className='card m-3'>
            <h2 className='ml-2'>Events</h2>
            <hr />
            <DataTable
                columns={columns}
                data={data}
                pagination
                paginationRowsPerPageOptions={[1, 2, 10, 25, 30]}
            />
        </div>
    )
}

export default EventList