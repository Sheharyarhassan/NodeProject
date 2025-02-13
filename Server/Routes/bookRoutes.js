const express = require("express");
const {
   addBook,
   getAllBooks,
   getBookById,
   updateBook,
   ActivateBook,
   DeactivateBook,
   getActiveBooks,
} = require("../controller/bookController");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");
const upload = require("../config/multerConfig");

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for managing books
 */

/**
 * @swagger
 * /book/Add:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []  # This route requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Book Title"
 *               author:
 *                 type: string
 *                 example: "Updated Author Name"
 *               publishedYear:
 *                 type: number
 *                 example: 2023
 *               genre:
 *                 type: string
 *                 example: "65b8c123a4e6f5d9f8b4567e"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Book added successfully
 */
router.post("/book/Add", authMiddleware, upload.single("image"), addBook);

/**
 * @swagger
 * /book/GetAll:
 *   get:
 *     summary: Retrieve all books (Public)
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books retrieved successfully
 */
router.get("/book/GetAll", getAllBooks); // No auth required

/**
 * @swagger
 * /book/getAllActive:
 *   get:
 *     summary: Get all active books (Public)
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of active books retrieved successfully
 */
router.get("/book/getAllActive", getActiveBooks); // No auth required

/**
 * @swagger
 * /book/GetById/{id}:
 *   get:
 *     summary: Get book by ID (Public)
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book details retrieved successfully
 *       404:
 *         description: Book not found
 */
router.get("/book/GetById/:id", getBookById); // No auth required

/**
 * @swagger
 * /book/Update/{id}:
 *   put:
 *     summary: Update a book (with image support)
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []  # Requires authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Book Title"
 *               author:
 *                 type: string
 *                 example: "Updated Author Name"
 *               publishedYear:
 *                 type: number
 *                 example: 2023
 *               genre:
 *                 type: string
 *                 example: "65b8c123a4e6f5d9f8b4567e"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 */
router.put("/book/Update/:id", authMiddleware, upload.single("image"), updateBook);

/**
 * @swagger
 * /book/Activate/{id}:
 *   patch:
 *     summary: Activate a book
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []  # Requires authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book activated successfully
 *       404:
 *         description: Book not found
 */
router.patch("/book/Activate/:id", authMiddleware, ActivateBook);

/**
 * @swagger
 * /book/Deactivate/{id}:
 *   patch:
 *     summary: Deactivate a book
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []  # Requires authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deactivated successfully
 *       404:
 *         description: Book not found
 */
router.patch("/book/Deactivate/:id", authMiddleware, DeactivateBook);

module.exports = router;
