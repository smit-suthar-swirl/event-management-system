const Event = require("../models/Event");


// Create a new event
const createEvent = async (title, time, location, image) => {
    try {
        const isAleredyExists = await Event.findOne({ title })
        if (isAleredyExists) {
            return {
                message: "Event aleready exists",
                success: false
            }
        } else {
            const event = new Event({
                title,
                time,
                location,
                image,
            });

            await event.save();
            return {
                message: "Event created successfully",
                success: true,
                event
            }
        }

    } catch (error) {
        throw new Error('An error occurred while creating the event.');
    }
};

// Get a list of all events
const getAllEvents = async () => {
    try {
        const events = await Event.find();
        return events;
    } catch (error) {
        throw new Error('An error occurred while fetching events.');
    }
};

// Get a single event by ID
const getEventById = async (eventId) => {
    try {
        const event = await Event.findById(eventId).populate('usersRegistered');
        if (!event) {
            throw new Error('Event not found');
        }
        return event;
    } catch (error) {
        throw new Error('An error occurred while fetching the event.');
    }
};

// Update an event by ID
const updateEvent = async (eventId, title, time, location, image) => {
    try {
        const event = await Event.findByIdAndUpdate(eventId, { title, time, location, image }, { new: true });
        if (!event) {
            throw new Error('Event not found');
        }
        return event;
    } catch (error) {
        throw new Error('An error occurred while updating the event.');
    }
};

// Delete an event by ID
const deleteEvent = async (eventId) => {
    try {
        const event = await Event.findByIdAndRemove(eventId);
        if (!event) {
            throw new Error('Event not found');
        }
    } catch (error) {
        throw Error('An error occurred while deleting the event.');
    }
};

const getlastThreeEvents = async () => {
    try {
        const lastThreeEvents = await Event.find()
            .sort({ createdAt: -1 }) // Replace 'createdAt' with your date field
            .limit(3);

        return lastThreeEvents;
    } catch (error) {
        throw Error('An error occurred while getting last three events.');
    }
};


module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    getlastThreeEvents
};
