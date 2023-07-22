const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profiles.controller");

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

/**
 * @openapi
 * /api/profiles/{username}/follow:
 *   post:
 *     summary: follow
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
router.post("/:username/follow", profileController.followPost);

/**
 * @openapi
 * /api/profiles/{username}/follow:
 *   delete:
 *     summary: unfollow
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
router.delete("/:username/follow", profileController.followDelete);

module.exports = router;
