const { PrismaClient } = require("@prisma/client");
const { createToken } = require("../middleware/auth");
const { createError } = require("../middleware/error");
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
      throw createError("password is incorrect");
    }
    const { email, username, bio, image } = user;
    const token = createToken(user);

    return { email, token, username, bio, image };
  } else {
    throw createError("User not found");
  }
}

async function create(email, username, password) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  const findUser = await prisma.user.findUnique({ where: { email } });
  if (findUser) {
    throw createError("Email already exists");
  }

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hash,
    },
  });

  const bio = "";
  const image = "";
  const token = createToken(user);

  return { email, token, username, bio, image };
}

async function get(id, token) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  let { email, username, bio, image } = user;
  bio = bio || "";
  image = image || "";

  return { email, token, username, bio, image };
}

async function update(id, email, username, password, image, bio, token) {
  const data = Object.fromEntries(
    Object.entries({
      email,
      username,
      password,
      image,
      bio,
    }).filter(([key, value]) => value !== undefined)
  );

  if (data.password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    data.password = hash;
  }

  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  bio = bio || "";
  image = image || "";
  return { email, token, username, bio, image };
}

module.exports = {
  login,
  create,
  get,
  update,
};
