import express from 'express';
import { createReview } from '../controllers/reviewController.js';
import protect from "../middleware/protectMiddleware.js";

const router = express.Router();

router.route('/').post(protect(), createReview);

export default router;