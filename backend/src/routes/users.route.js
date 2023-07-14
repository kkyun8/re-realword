const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");

// TODO: error code

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     Token:
 *       type: apiKey
 *       name: Authorization
 *       in: header
 * /api/users/login:
 *   post:
 *     summary: login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: NG
 */
router.post("/login", userController.login);

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Creates a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: NG
 */
router.post("/", userController.create);

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get user
 *     produces:
 *      - application/json
 *     security:
 *      - Token: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: NG
 */
router.get("/", userController.get);

/**
 * @openapi
 * /api/users:
 *   put:
 *     summary: Update user
 *     security:
 *      - Token: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   username:
 *                     type: string
 *                   password:
 *                     type: string
 *                   image:
 *                     type: string
 *                   bio:
 *                     type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: NG
 */
router.put("/", userController.update);

module.exports = router;
