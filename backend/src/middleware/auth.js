const jwt = require("jsonwebtoken");
const tokenKey = process.env.TOKEN_KEY || "secret";

function authorization(req) {
  const auth = req.header("Authorization");
  if (!auth) {
    throw new Error("No token, authorization denied");
  } else {
    const [type, token] = auth.split(" ");
    if (type !== "Token") {
      throw new Error("Invalid token type");
    }

    try {
      const decoded = jwt.verify(token, tokenKey);
      const { id, email } = decoded.user;

      return { id, email };
    } catch (e) {
      throw new Error(e.message);
    }
  }
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
