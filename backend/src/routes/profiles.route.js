const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profiles.controller");

//create swagger get profile document
/**
 * @openapi
 * /api/profiles/{username}:
 *   get:
 *     summary: Get profile
 *     produces:
 *       application/json
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profiles'
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: NG
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:username", profileController.get);

module.exports = router;
