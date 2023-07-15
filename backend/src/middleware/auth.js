const jwt = require("jsonwebtoken");
const tokenKey = process.env.TOKEN_KEY || "secret";

const Unauthorized = new Error("Unauthorized");
Unauthorized.status = 401;

function authorization(req) {
  const auth = req.header("Authorization");
  if (!auth) {
    throw Unauthorized;
  } else {
    const [type, token] = auth.split(" ");
    if (type !== "Token") {
      throw Unauthorized;
    }

    try {
      const decoded = jwt.verify(token, tokenKey);
      const { id, email } = decoded.user;

      return { id, email, token };
    } catch (e) {
      throw Unauthorized;
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
