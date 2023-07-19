const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function get(username, loginUserId) {
  const profile = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!profile) {
    throw new Error("Profile not found");
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
    throw new Error("Profile not found");
  }

  const follow = await prisma.follow.findFirst({
    where: {
      followerUserId: loginUserId,
      followingUserId: profile.id,
    },
  });

  if (follow) {
    throw new Error("Already following");
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
    throw new Error("Profile not found");
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
