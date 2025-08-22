const express = require("express");
const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  ActivateBook,
  DeactivateBook,
  getActiveBooks,
  getBooksByGenre,
  getBookFilters
} = require("../controller/bookController");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware");
const upload = require("../config/multerConfig");
const setUploadFolder = require("../middleware/setUploadFolder");
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
router.post("/book/Add", authMiddleware, setUploadFolder('books'), upload.single("image"), addBook);

/**
 * @swagger
 * /book/GetAll:
 *   get:
 *     summary: Retrieve all books (Public)
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []  # This route requires authentication
 *     responses:
 *       200:
 *         description: List of books retrieved successfully
 */
router.get("/book/GetAll", authMiddleware, getAllBooks); // No auth required

/**
 * @swagger
 * /book/GetBooksByGenre/{genre}:
 *   get:
 *     summary: Retrieve Active books by Genre (Public)
 *     tags: [Books]
 *     parameters:
 *      - in: path
 *        name: genre
 *        required: true
 *        schema:
 *         type: string
 *         description: Genre
 *     responses:
 *       200:
 *         description: List of books retrieved successfully
 */
router.get("/book/GetBooksByGenre/:genre", getBooksByGenre);

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
router.put("/book/Update/:id", authMiddleware, setUploadFolder('books'), upload.single("image"), updateBook);

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
/**
 * @swagger
 * /book/getFilters:
 *   get:
 *     summary: Get all books Filter (Private)
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []  # Requires authentication
 *     responses:
 *       200:
 *         description: List of books Filters retrieved successfully
 */

router.get('/book/getFilters', authMiddleware, getBookFilters)
module.exports = router;
