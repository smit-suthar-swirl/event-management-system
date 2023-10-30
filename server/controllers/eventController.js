const { uploadImage } = require('../cloudinary/cloudinaryFunctions');
const Event = require('../models/Event');
const eventService = require('../services/eventServices');

// Create a new eventfilename, foldername, file
const createEvent = async (req, res) => {
    const { title, time, location } = req.body;

    const imageData = await uploadImage(req.file.path, title)
    const image = imageData?.secure_url
    try {
        if (image) {
            const event = await eventService.createEvent(title, time, location, image);

            res.status(201).json(event);
        } else {
            res.status(500).json({ error: "Something went wrong" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a list of all events
const getAllEvents = async (req, res) => {
    try {
        const events = await eventService.getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single event by ID
const getEventById = async (req, res) => {
    const eventId = req.params.id;

    try {
        const event = await eventService.getEventById(eventId);
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Update an event by ID
const updateEvent = async (req, res) => {
    const eventId = req.params.id;
    const { title, time, location, image } = req.body;

    try {
        const event = await eventService.updateEvent(eventId, title, time, location, image);

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an event by ID
const deleteEvent = async (req, res) => {
    const eventId = req.params.id;

    try {
        await eventService.deleteEvent(eventId);
        res.status(204).end();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// getlastthreeEvents
const getLastthreeEvents = async (req, res) => {
    try {
        const data = await eventService.getlastThreeEvents();

        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const bookUnBookEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const userId = req.params.userId;

        // Find the event by ID
        const event = await Event.findOne({ _id: eventId })
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Check if the user is already registered for the event
        const isUserRegistered = event.usersRegistered.includes(userId);

        if (isUserRegistered) {
            // User is already registered, so remove them from the array
            event.usersRegistered = event.usersRegistered.filter(id => id.toString() !== userId);

            await event.save();

            return res.status(200).json({ message: "Event unbooked successfully" });
        } else {
            // User is not registered, so add them to the array
            event.usersRegistered.push(userId);
            await event.save();

            return res.status(200).json({ message: "Event booked successfully" });
        }
    } catch (error) {
        console.error("Error from this", error);
        res.status(500).json({ message: "An error occurred" });
    }
};

const getMyBookedEvents = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find all events where the user is registered
        const events = await Event.find({ usersRegistered: userId }).populate('usersRegistered', 'username');

        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    getLastthreeEvents,
    bookUnBookEvent,
    getMyBookedEvents
};
