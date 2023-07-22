const tagService = require("../services/tags.service");

async function get(req, res, next) {
  try {
    const tags = await tagService.get();
    res.status(200).json({ tags });
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = {
  get,
};
