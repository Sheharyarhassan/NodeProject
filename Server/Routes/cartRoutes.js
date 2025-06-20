const express = require('express');
const {getCart, AddToCartGuest, AddToCartUser} = require("../controller/cartController");
const {authMiddleware} = require("../middleware/authMiddleware");
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API for managing cart
 */

/**
 * @swagger
 * /user/addToCart:
 *   post:
 *     summary: Add to Cart of User
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []  # This route requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "userid"
 *               bookId:
 *                 type: string
 *                 example: "BookId"
 *               quantity:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Added to Cart successfully
 */
router.post("/user/addToCart", authMiddleware, AddToCartUser);
/**
 * @swagger
 * /addToCart:
 *   post:
 *     summary: Add to Cart of Guest
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               guestId:
 *                 type: string
 *                 example: "guestId"
 *               bookId:
 *                 type: string
 *                 example: "BookId"
 *               quantity:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Added to Cart successfully
 */
router.post("/addToCart", AddToCartGuest);
/**
 * @swagger
 * /getCart:
 *   get:
 *     summary: Retrieve all Cart Data (Public)
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 */
router.get("/getCart/:userId", getCart);

module.exports = router;