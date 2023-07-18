// create /api/profiles/:username jest supertest code
// // Path: backend/test/unit/Profiles.test.js
const request = require("supertest");
const app = require("../../app");

jest.unmock("@prisma/client");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe("会員登録〜ログイン〜Profile取得〜follow〜un follow", () => {
  let token;

  beforeAll(async () => {
    const follower = await prisma.user.findFirst({
      where: {
        email: "test@test.com",
      },
    });
    const following = await prisma.user.findFirst({
      where: {
        email: "testemail@test.com",
      },
    });
    if (!!follower && !!following) {
      const follow = await prisma.follow.findUnique({
        where: {
          followerUserId: follower.id,
          followingUserId: following.id,
        },
      });
      if (follow) {
        await prisma.follow.delete({
          where: {
            followerUserId: follower.id,
            followingUserId: following.id,
          },
        });
      }
    }

    if (follower) {
      // delete param only where id
      await prisma.user.delete({
        where: {
          id: follower.id,
        },
      });
    }
    if (following) {
      // delete param only where id
      await prisma.user.delete({
        where: {
          id: following.id,
        },
      });
    }

    await request(app)
      .post("/api/users")
      .send({
        user: {
          username: "test",
          email: "test@test.com",
          password: "test",
        },
      });

    await request(app)
      .post("/api/users")
      .send({
        user: {
          username: "testusername",
          email: "testemail@test.com",
          password: "testpassword",
        },
      });

    const login = await request(app)
      .post("/api/users/login")
      .send({
        user: {
          email: "test@test.com",
          password: "test",
        },
      });

    token = login.body.user.token;
  });

  test("Profile取得", async () => {
    const response = await request(app)
      .get(`/api/profiles/testusername`)
      .set("Authorization", `Token ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.profile).toHaveProperty("username");
    expect(response.body.profile).toHaveProperty("bio");
    expect(response.body.profile).toHaveProperty("image");
    expect(response.body.profile).toHaveProperty("following");

    expect(response.body.profile.username).toBe("testusername");
    expect(response.body.profile.bio).toBe("");
    expect(response.body.profile.image).toBe("");
    expect(response.body.profile.following).toBe(false);
  });
});
