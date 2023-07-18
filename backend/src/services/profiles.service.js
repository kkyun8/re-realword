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

module.exports = {
  get,
};
