const jwt = require("jsonwebtoken");
const tokenKey = process.env.TOKEN_KEY || "secret";

// TODO: error handling
function authorization(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return "No token, authorization denied";
  }
  let msg = "";
  try {
    const decoded = jwt.verify(token, tokenKey);
    req.user = decoded;
  } catch (e) {
    msg = "Token is not valid";
  }
  return msg;
}

function createToken(user) {
  const { id, email } = user;
  const payload = {
    user: {
      id,
      email,
    },
  };
  // TODO: option
  // const options = {
  //   expiresIn: "1h",
  // };
  return jwt.sign(payload, tokenKey);
}

module.exports = {
  authorization,
  createToken,
};
