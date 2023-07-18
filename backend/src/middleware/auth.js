const jwt = require("jsonwebtoken");
const tokenKey = process.env.TOKEN_KEY || "secret";

const Unauthorized = new Error("Unauthorized");
Unauthorized.status = 401;

function authorization(req, isOptional = false) {
  const auth = req.header("Authorization");
  if (!auth) {
    if (!isOptional) throw Unauthorized;
  } else {
    const [type, token] = auth.split(" ");
    if (type !== "Token") {
      if (!isOptional) throw Unauthorized;
    }

    try {
      const decoded = jwt.verify(token, tokenKey);
      const { id, email } = decoded.user;

      return { id, email, token };
    } catch (e) {
      if (!isOptional) throw Unauthorized;
    }
  }
  return {};
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
