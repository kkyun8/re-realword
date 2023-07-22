const { validationResult } = require("express-validator");

function createValidationResult(req, res, next) {
  let errorJson = {};
  let hasErrors = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const results = errors.array();
    const body = results.map((error) => `${error.path} ${error.msg}`);
    errorJson = { errors: { body } };
    hasErrors = true;
  }
  return { errorJson, hasErrors };
}

module.exports = {
  createValidationResult,
};
