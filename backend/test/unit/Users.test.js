const request = require("supertest");
const app = require("../../app");
let token;

describe("会員登録〜ログイン〜ログインユーザー情報取得〜ユーザー情報変更〜変更情報確認", () => {
  test("会員登録", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        user: {
          username: "test",
          email: "test@test.com",
          password: "test",
        },
      });

    expect(response.statusCode).toBe(200);

    expect(response.body.user).toHaveProperty("token");
    expect(response.body.user).toHaveProperty("bio");
    expect(response.body.user).toHaveProperty("image");

    token = response.body.user.token;

    expect(response.body.user).not.toHaveProperty("password");
    expect(response.body.user.username).toBe("test");
    expect(response.body.user.email).toBe("test@test.com");
  });

  test("ログイン", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({
        user: {
          email: "test@test.com",
          password: "test",
        },
      });

    expect(response.statusCode).toBe(200);

    expect(response.body.user).toHaveProperty("token");
    expect(response.body.user).toHaveProperty("bio");
    expect(response.body.user).toHaveProperty("image");

    token = response.body.user.token;

    expect(response.body.user).not.toHaveProperty("password");
    expect(response.body.user.username).toBe("test");
    expect(response.body.user.email).toBe("test@test.com");
  });

  test("ログインユーザー情報取得", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Token ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.user).toHaveProperty("token");
    expect(response.body.user).toHaveProperty("bio");
    expect(response.body.user).toHaveProperty("image");

    token = response.body.user.token;

    expect(response.body.user).not.toHaveProperty("password");
    expect(response.body.user.username).toBe("test");
    expect(response.body.user.email).toBe("test@test.com");
  });

  test("ユーザー情報変更", async () => {
    const response = await request(app)
      .put("/api/users")
      .set("Authorization", `Token ${token}`)
      .send({
        user: {
          username: "testusername",
          email: "testemail@test.com",
          password: "testpassword",
          image: "testimage",
          bio: "testbio",
        },
      });

    expect(response.body.user).toHaveProperty("token");
    token = response.body.user.token;

    expect(response.body.user).not.toHaveProperty("password");
    expect(response.body.user.username).toBe("testusername");
    expect(response.body.user.email).toBe("testemail@test.com");
    expect(response.body.user.image).toBe("testimage");
    expect(response.body.user.bio).toBe("testbio");
  });

  // 変更情報確認
  test("変更情報確認", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Token ${token}`);

    expect(response.body.user).toHaveProperty("token");
    token = response.body.user.token;

    expect(response.body.user).not.toHaveProperty("password");
    expect(response.body.user.username).toBe("testusername");
    expect(response.body.user.email).toBe("testemail@test.com");
    expect(response.body.user.image).toBe("testimage");
    expect(response.body.user.bio).toBe("testbio");
  });
});

describe("会員登録・異常系", () => {
  test("会員登録・パラメータなし", async () => {
    const response = await request(app).post("/api/users");
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("errors");
  });
  test("会員登録・パラメータなし", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        user: {
          username: "username",
          email: "",
          password: "",
        },
      });
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("errors");
  });
  test("会員登録・パラメータなし", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        user: {
          username: "",
          email: "email",
          password: "",
        },
      });
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("errors");
  });
  test("会員登録・パラメータなし", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        user: {
          username: "",
          email: "",
          password: "password",
        },
      });
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("errors");
  });

  test("会員登録・パラメータが空欄", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        user: {
          username: " ",
          email: " ",
          password: " ",
        },
      });
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors.body).toBeInstanceOf(Array);
  });

  test("会員登録・メールアドレス重複", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        user: {
          username: "testusername",
          email: "testemail@test.com",
          password: "testpassword",
        },
      });
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors.body).toBeInstanceOf(Array);
  });
});

describe("ログイン・異常系", () => {
  test("ログイン・パラメータなし", async () => {
    const response = await request(app).post("/api/users/login");
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("errors");
  });

  test("ログイン・パラメータが空欄", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({
        user: {
          email: " ",
          password: " ",
        },
      });
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors.body).toBeInstanceOf(Array);
  });

  test("ログイン・存在しないユーザー", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({
        user: {
          email: "empty",
          password: "password",
        },
      });
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors.body).toBeInstanceOf(Array);
  });
});

describe("ログインユーザー情報取得・異常系", () => {
  test("ログインユーザー情報取得・TOKENなし", async () => {
    const response = await request(app).get("/api/users");
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("errors");
  });

  test("ログインユーザー情報取得・TOKENvalue定義エラー", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `token ${token}`);
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("errors");
  });

  test("ログインユーザー情報取得・存在しないTOKEN", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Token token`);
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("errors");
  });
});

describe("ユーザー情報変更・異常系", () => {
  test("ユーザー情報変更・TOKENなし", async () => {
    const response = await request(app)
      .put("/api/users")
      .send({
        user: {
          username: "testusername",
          email: "testemail@test.com",
          password: "testpassword",
          image: "testimage",
          bio: "testbio",
        },
      });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("errors");
  });

  test("ユーザー情報変更・TOKENvalue定義エラー", async () => {
    const response = await request(app)
      .put("/api/users")
      .set("Authorization", `token ${token}`)
      .send({
        user: {
          username: "testusername",
          email: "testemail@test.com",
          password: "testpassword",
          image: "testimage",
          bio: "testbio",
        },
      });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("errors");
  });

  test("ユーザー情報変更・存在しないTOKEN", async () => {
    const response = await request(app)
      .put("/api/users")
      .set("Authorization", `Token token`)
      .send({
        user: {
          username: "testusername",
          email: "testemail@test.com",
          password: "testpassword",
          image: "testimage",
          bio: "testbio",
        },
      });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("errors");
  });

  test("ユーザー情報変更・パラメータなし", async () => {
    const response = await request(app)
      .put("/api/users")
      .set("Authorization", `Token ${token}`);
    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("errors");
  });
});

describe("ユーザー情報変更・正常系", () => {
  test("ユーザー情報変更・入力値が空欄の場合、更新しない", async () => {
    const response = await request(app)
      .put("/api/users")
      .set("Authorization", `Token ${token}`)
      .send({
        user: {
          username: "testusername",
          email: "testemail@test.com",
          password: "password",
          image: " ",
          bio: " ",
        },
      });

    expect(response.body.user).toHaveProperty("token");
    token = response.body.user.token;

    expect(response.body.user).not.toHaveProperty("password");
    expect(response.body.user.username).toBe("testusername");
    expect(response.body.user.email).toBe("testemail@test.com");
    expect(response.body.user.image).toBe("");
    expect(response.body.user.bio).toBe("");
  });
});
