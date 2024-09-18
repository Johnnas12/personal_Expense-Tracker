const Event = require('../models/Event')


// fetching existing events
const fetchEvents = async (req, res) => {
    try {
        const events = await Event.find({ userId: req.user.id });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


// Adding new events
const addEvents = async (req, res) => {
    const { title, start, end } = req.body;
    try {
        const newEvent = new Event({
            title,
            start,
            end,
            backgroundColor: color, 
            userId: req.user.id,
        });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

// mark as done when events are finished

const markAsDone = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Toggle the completion status
        event.completed = !event.completed;
        await event.save();

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = {fetchEvents, addEvents, markAsDone}