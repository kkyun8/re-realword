const express = require("express");
const { body, header } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/users.controller");

// TODO: /api/users/login 401 Unauthorizedが発生するケースは？
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
 *       422:
 *         description: NG
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/login",
  [
    body("user").isObject(),
    body("user.email").if(body("user").exists()).isEmail().trim(),
    body("user.password")
      .if(body("user").exists())
      .notEmpty()
      .isString()
      .trim(),
  ],
  userController.login
);

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
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       422:
 *         description: NG
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  "/",
  [
    body("user").isObject(),
    body("user.email").if(body("user").exists()).notEmpty().isEmail(),
    body("user.username")
      .if(body("user").exists())
      .notEmpty()
      .isString()
      .trim(),
    body("user.password")
      .if(body("user").exists())
      .notEmpty()
      .isString()
      .trim(),
  ],
  userController.create
);

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
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: NG
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: NG
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put(
  "/",
  [
    body("user").isObject(),
    body("user.email").notEmpty().isEmail(),
    body("user.username").notEmpty().isString().trim(),
    body("user.password").notEmpty().isString().trim(),
    body("user.image").isString().trim(),
    body("user.bio").isString().trim(),
  ],
  userController.update
);

module.exports = router;
