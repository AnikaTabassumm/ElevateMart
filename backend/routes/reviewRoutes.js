// routes/reviewRoutes.js
import express from 'express';
import { createReview, getProductReviews } from '../controllers/reviewController.js';
import protect from "../middleware/protectMiddleware.js";

const router = express.Router();

router.route('/').post(protect(), createReview);
router.route('/product/:productId').get(getProductReviews);

export default router;