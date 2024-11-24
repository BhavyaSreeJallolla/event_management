// routes/eventRoutes.js

import express from 'express';
import { getEventById } from '../controllers/eventController.js';

const router = express.Router();


router.get('/:eventId', getEventById);

export default router;
