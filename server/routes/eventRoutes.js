const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const multer = require('multer');
const path = require('path');

// Define a storage location for uploaded files (you can customize this)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

router.post('/create-event', upload.single('image'), eventController.createEvent);
router.get('/get-events', eventController.getAllEvents);
router.get('/get-single-event/:id', eventController.getEventById);
router.put('/update-event/:id', eventController.updateEvent);
router.delete('/delete-event/:id', eventController.deleteEvent);
router.get('/get-last-three-events', eventController.getLastthreeEvents);
router.post('/book-event/:eventId/:userId', eventController.bookUnBookEvent);
router.get('/registered/:userId', eventController.getMyBookedEvents);


module.exports = router;
