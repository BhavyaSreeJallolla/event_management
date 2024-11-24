// controllers/eventController.js

import Event from '../models/Event.js';

// @desc    Create a new event
// @route   POST /api/events
// @access  Public
export const createEvent = async (req, res) => {
  try {
    const { name, date, location, amount, organizer } = req.body;

    // Validate required fields
    if (!name || !date || !location || amount === undefined || !organizer) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const event = new Event({
      name,
      date,
      location,
      amount,
      organizer,
    });

    const savedEvent = await event.save();
    res.status(201).json({
      message: 'Event created successfully',
      event: savedEvent,
    });
  } catch (error) {
    console.error(`Error creating event: ${error.message}`);
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Sort by date ascending
    res.status(200).json(events);
  } catch (error) {
    console.error(`Error fetching events: ${error.message}`);
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Get event by eventId
// @route   GET /api/events/:eventId
// @access  Public
export const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findOne({ eventId });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error(`Error fetching event: ${error.message}`);
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:eventId
// @access  Public
export const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const updates = req.body;

    const updatedEvent = await Event.findOneAndUpdate(
      { eventId },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      message: 'Event updated successfully',
      event: updatedEvent,
    });
  } catch (error) {
    console.error(`Error updating event: ${error.message}`);
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:eventId
// @access  Public
export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const deletedEvent = await Event.findOneAndDelete({ eventId });

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(`Error deleting event: ${error.message}`);
    res.status(500).json({ error: 'Server Error' });
  }
};
