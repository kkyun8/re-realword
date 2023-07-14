const { authorization } = require("../middleware/auth");
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

async function get(req, res, next) {
  try {
    const { id } = authorization(req);

    // Authentication required, returns a User that's the current user
    const user = await userService.get(id);
    res.json({ user });
    next();
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  const { email, username, password, image, bio } = req.body.user;
  try {
    const { id } = authorization(req);

    // Authentication required, returns the User
    // Accepted fields: email, username, password, image, bio
    const user = await userService.update(
      id,
      email,
      username,
      password,
      image,
      bio
    );
    res.json({ user });
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = {
  login,
  create,
  get,
  update,
};
