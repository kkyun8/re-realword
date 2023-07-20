const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function get(username, loginUserId) {
  const profile = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!profile) {
    const error = new Error("Profile not found");
    error.status = 422;
    throw error;
  }

  let following = false;
  if (loginUserId) {
    const follow = await prisma.follow.findFirst({
      where: {
        followerUserId: loginUserId,
        followingUserId: profile.id,
      },
    });
    if (follow) {
      following = true;
    }
  }

  let { bio, image } = profile;
  bio = bio || "";
  image = image || "";
  return { username, bio, image, following };
}

async function followPost(username, loginUserId) {
  const profile = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!profile) {
    const error = new Error("Profile not found");
    error.status = 422;
    throw error;
  }

  const follow = await prisma.follow.findFirst({
    where: {
      followerUserId: loginUserId,
      followingUserId: profile.id,
    },
  });

  if (follow) {
    const error = new Error("Already following");
    error.status = 422;
    throw error;
  }

  await prisma.follow.create({
    data: {
      followerUserId: loginUserId,
      followingUserId: profile.id,
    },
  });

  return get(username, loginUserId);
}

async function followDelete(username, loginUserId) {
  const profile = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!profile) {
    const error = new Error("Profile not found");
    error.status = 422;
    throw error;
  }

  const following = await prisma.follow.findUnique({
    where: {
      followerUserId: loginUserId,
      followingUserId: profile.id,
    },
  });
  if (following) {
    await prisma.follow.delete({
      where: {
        followerUserId: loginUserId,
        followingUserId: profile.id,
      },
    });
  }

  return get(username, loginUserId);
}

module.exports = {
  get,
  followPost,
  followDelete,
};
