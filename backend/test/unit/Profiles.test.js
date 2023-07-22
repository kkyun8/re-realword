// create /api/profiles/:username jest supertest code
// // Path: backend/test/unit/Profiles.test.js
const request = require("supertest");
const app = require("../../app");

jest.unmock("@prisma/client");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe("会員登録〜ログイン〜Profile取得〜follow〜unfollow", () => {
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

  test("Follow", async () => {
    const response = await request(app)
      .post(`/api/profiles/testusername/follow`)
      .set("Authorization", `Token ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.profile).toHaveProperty("username");
    expect(response.body.profile).toHaveProperty("bio");
    expect(response.body.profile).toHaveProperty("image");
    expect(response.body.profile).toHaveProperty("following");

    expect(response.body.profile.username).toBe("testusername");
    expect(response.body.profile.bio).toBe("");
    expect(response.body.profile.image).toBe("");
    expect(response.body.profile.following).toBe(true);
  });

  test("UnFollow", async () => {
    const response = await request(app)
      .delete(`/api/profiles/testusername/follow`)
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

  test("Profile取得・ユーザーなし", async () => {
    const response = await request(app)
      .get(`/api/profiles/none`)
      .set("Authorization", `Token ${token}`);
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("errors");
  });

  test("Profile取得・トークンなし", async () => {
    const response = await request(app).get(`/api/profiles/testusername`);
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

  test("Profile取得・トークン認証失敗", async () => {
    const response = await request(app)
      .get(`/api/profiles/testusername`)
      .set("Authorization", `Token token`);
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("errors");
  });

  test("Follow・トークンなし", async () => {
    const response = await request(app).post(
      `/api/profiles/testusername/follow`
    );
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("errors");
  });

  test("Follow・トークン認証失敗", async () => {
    const response = await request(app)
      .post(`/api/profiles/testusername/follow`)
      .set("Authorization", `Token token`);
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("errors");
  });

  test("Follow・存在しないユーザ", async () => {
    const response = await request(app)
      .post(`/api/profiles/nonw/follow`)
      .set("Authorization", `Token ${token}`);
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("errors");
  });

  test("Follow・Follow済みユーザ", async () => {
    const follow = await request(app)
      .post(`/api/profiles/testusername/follow`)
      .set("Authorization", `Token ${token}`);

    const response = await request(app)
      .post(`/api/profiles/testusername/follow`)
      .set("Authorization", `Token ${token}`);
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("errors");
  });

  test("UnFollow・トークンなし", async () => {
    const response = await request(app).delete(
      `/api/profiles/testusername/follow`
    );
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("errors");
  });

  test("UnFollow・トークン認証失敗", async () => {
    const response = await request(app)
      .delete(`/api/profiles/testusername/follow`)
      .set("Authorization", `Token token`);
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("errors");
  });

  test("UnFollow・存在しないユーザ", async () => {
    const response = await request(app)
      .delete(`/api/profiles/none/follow`)
      .set("Authorization", `Token ${token}`);
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("errors");
  });

  test("UnFollow・UnFollow済みユーザ・正常系", async () => {
    const follow = await request(app)
      .delete(`/api/profiles/testusername/follow`)
      .set("Authorization", `Token ${token}`);

    const response = await request(app)
      .delete(`/api/profiles/testusername/follow`)
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
