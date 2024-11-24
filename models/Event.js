// models/Event.js

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const eventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Event amount is required'],
    min: [0, 'Amount cannot be negative'],
  },
  organizer: {
    type: String,
    required: [true, 'Organizer name is required'],
    trim: true,
  },
}, {
  timestamps: true,
});

// Export the model
const Event = mongoose.model('Event', eventSchema);
export default Event;
