const express = require("express");
const router = express.Router();
const {
  changePassword,
  userUpdate,
  userLogin,
  userSignup,
  getAllUsers,
  addUserType,
  updateUserType,
  getAllUserTypes,
  getAllActiveTypes,
  ActivateUserType,
  DeactivateUserType,
  adminSignup,
  getUserById,
  logoutUser, getUserChartData,
} = require("../controller/userController");
const {authMiddleware} = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for user management
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: "username"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", userLogin);

/**
 * @swagger
 * /Signup:
 *   post:
 *     summary: User signup
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/Signup", userSignup);
/**
 * @swagger
 * /adminSignup:
 *   post:
 *     summary: Admin signup
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/addUser", authMiddleware, adminSignup);
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized - No valid token provided
 */

router.post("/logout", authMiddleware, logoutUser);

/**
 * @swagger
 * /user/Update/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Name"
 *               email:
 *                 type: string
 *                 example: "updated@example.com"
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put("/user/Update/:id", authMiddleware, userUpdate);

/**
 * @swagger
 * /user/changePassword:
 *   put:
 *     summary: Change user password
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                userName:
 *                 type: string
 *                 example: "userName"
 *                oldPassword:
 *                 type: string
 *                 example: "oldPassword123"
 *                newPassword:
 *                 type: string
 *                 example: "newPassword456"
 *     responses:
 *       200:
 *         description: Password changed successfully
 */
router.put("/user/changePassword", authMiddleware, changePassword);

/**
 * @swagger
 * /user/getById/{id}:
 *   get:
 *     summary: Get User By Id
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 */
router.get("/user/getById/:id", authMiddleware, getUserById);

/**
 * @swagger
 * /users/getAll:
 *   get:
 *     summary: Get all users filtered by type
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [user, admin]
 *         required: true
 *         description: Filter users by type (user or admin)
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *       400:
 *         description: Invalid or missing type
 *       500:
 *         description: Server error
 */
router.get("/users/getAll", authMiddleware, getAllUsers);

/**
 * @swagger
 * tags:
 *   name: User Types
 *   description: API for user type management
 */

/**
 * @swagger
 * /usertype/Add:
 *   post:
 *     summary: Add a new user type
 *     tags: [User Types]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Admin"
 *     responses:
 *       201:
 *         description: User type added successfully
 */
router.post("/usertype/Add", authMiddleware, addUserType);

/**
 * @swagger
 * /usertype/Update/{id}:
 *   put:
 *     summary: Update user type
 *     tags: [User Types]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User type ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated User Type"
 *     responses:
 *       200:
 *         description: User type updated successfully
 */
router.put("/usertype/Update/:id", authMiddleware, updateUserType);

/**
 * @swagger
 * /usertype/getAll:
 *   get:
 *     summary: Get all user types
 *     tags: [User Types]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of user types retrieved successfully
 */
router.get("/usertype/getAll", authMiddleware, getAllUserTypes);

/**
 * @swagger
 * /usertype/getAllActive:
 *   get:
 *     summary: Get all active user types
 *     tags: [User Types]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of active user types retrieved successfully
 */
router.get("/usertype/getAllActive", authMiddleware, getAllActiveTypes);

/**
 * @swagger
 * /user/getUserChartData:
 *   get:
 *     summary: Get all Users Chart Data (Public)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of All Users Chart Data
 */
router.get("/user/getUserChartData", getUserChartData);

/**
 * @swagger
 * /usertype/Activate/{id}:
 *   patch:
 *     summary: Activate a user type
 *     tags: [User Types]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User type ID
 *     responses:
 *       200:
 *         description: User type activated successfully
 */
router.patch("/usertype/Activate/:id", authMiddleware, ActivateUserType);

/**
 * @swagger
 * /usertype/Deactivate/{id}:
 *   patch:
 *     summary: Deactivate a user type
 *     tags: [User Types]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User type ID
 *     responses:
 *       200:
 *         description: User type deactivated successfully
 */
router.patch("/usertype/Deactivate/:id", authMiddleware, DeactivateUserType);

module.exports = router;
