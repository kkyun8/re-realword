const userService = require("../services/users.service");

async function login(req, res, next) {
  const { email, password } = req.body.user;
  try {
    // Required fields: email, password
    if (!email || !password) {
      throw new Error("email or password is empty");
    }

    // No authentication required, returns a User
    const user = await userService.login(email, password);
    res.json({ user });
    next();
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  const { email, username, password } = req.body.user;
  try {
    // Required fields: email, username, password
    if (!email || !username || !password) {
      throw new Error("email or username or password is empty");
    }

    // No authentication required, returns a User
    const user = await userService.create(email, username, password);
    res.json({ user });
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = {
  login,
  create,
};
