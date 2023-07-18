const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const usersRouter = require("./src/routes/users.route");
const tagsRouter = require("./src/routes/tags.route");
const profilesRouter = require("./src/routes/profiles.route");

const app = express();

app.use(logger("dev"));
// charset=utf-8はexpressのデフォルトなので、指定しなくても良い
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api/users", usersRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/profiles", profilesRouter);

//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "RE-REALWORD API",
      version: "1.0.0",
    },
    basePath: "/api",
    consumes: ["application/json"],
    components: {
      schemas: require("./schemas.json"),
    },
  },
  apis: ["./src/routes/*"],
};
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  const errors = { body: [err.message] };
  res.json({ errors });
});

module.exports = app;
