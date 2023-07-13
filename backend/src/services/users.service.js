const { PrismaClient } = require("@prisma/client");
const { createToken } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT_ROUNDS || 10;
const prisma = new PrismaClient();

async function login(email, password) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("password is incorrect");
    }
    const { email, username, bio, image } = user;
    const token = createToken(user);

    return { email, token, username, bio, image };
  } else {
    throw new Error("User not found");
  }
}

async function create(email, username, password) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  const findUser = await prisma.user.findUniqueOrThrow({ where: { email } });
  if (findUser) {
    throw new Error("Email already exists");
  }

  const user = await prisma.user
    .create({
      data: {
        email,
        username,
        password: hash,
      },
    })
    .catch((e) => {
      throw new Error(e.message);
    });

  const bio = "";
  const image = "";
  const token = createToken(user);

  return { email, token, username, bio, image };
}

module.exports = {
  login,
  create,
};
