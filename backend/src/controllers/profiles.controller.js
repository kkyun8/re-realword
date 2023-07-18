const profileService = require("../services/profiles.service");
const { authorization } = require("../middleware/auth");

async function get(req, res, next) {
  const { username } = req.params;
  try {
    const { id } = authorization(req, true);

    const profile = await profileService.get(username, id);
    res.status(200).json({ profile });
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = {
  get,
};
