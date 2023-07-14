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

async function get(id) {
  const user = await prisma.user
    .findUnique({
      where: {
        id,
      },
    })
    .catch((e) => {
      throw new Error(e.message);
    });

  const { email, username, bio, image } = user;
  return { email, username, bio, image };
}

async function update(id, email, username, password, image, bio) {
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

  const user = await prisma.user
    .update({
      where: {
        id,
      },
      data,
    })
    .catch((e) => {
      throw new Error(e.message);
    });

  return { email, username, bio, image };
}

module.exports = {
  login,
  create,
  get,
  update,
};
