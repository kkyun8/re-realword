const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tags.controller");

/**
 * @openapi
 * /api/tags:
 *   get:
 *     summary: Get tags
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tags'
 *       422:
 *         description: NG
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", tagController.get);

module.exports = router;
