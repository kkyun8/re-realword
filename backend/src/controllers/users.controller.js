const { createValidationResult } = require("../middleware/error");
const { authorization } = require("../middleware/auth");
const userService = require("../services/users.service");

async function login(req, res, next) {
  const { errorJson, hasErrors } = createValidationResult(req);
  if (hasErrors) {
    return res.status(422).json(errorJson);
  }

  const { email, password } = req.body.user;
  try {
    // No authentication required, returns a User
    const user = await userService.login(email, password);
    res.status(200).json({ user });
    next();
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  const { errorJson, hasErrors } = createValidationResult(req);
  if (hasErrors) {
    return res.status(422).json(errorJson);
  }

  const { email, username, password } = req.body.user;
  try {
    // No authentication required, returns a User
    const user = await userService.create(email, username, password);
    res.status(201).json({ user });
    next();
  } catch (e) {
    next(e);
  }
}

async function get(req, res, next) {
  try {
    const { id, token } = authorization(req);

    // Authentication required, returns a User that's the current user
    const user = await userService.get(id, token);
    res.status(200).json({ user });
    next();
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  const { errorJson, hasErrors } = createValidationResult(req);
  if (hasErrors) {
    return res.status(422).json(errorJson);
  }

  const { email, username, password, image, bio } = req.body.user;
  try {
    const { id, token } = authorization(req);

    // Authentication required, returns the User
    // Accepted fields: email, username, password, image, bio
    const user = await userService.update(
      id,
      email,
      username,
      password,
      image,
      bio,
      token
    );
    res.status(200).json({ user });
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
