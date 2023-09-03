const express = require("express");
const {
  signUp,
  signIn,
  signOut,
  verifyToken
} = require("../controllers/auth.controller.js");
const { validateSchema } = require("../middlewares/validator.middleware.js");
const { registerSchema, loginSchema } = require("../schemas/auth.schema.js");

const router = express.Router();

router.post("/signup", validateSchema(registerSchema), signUp);

router.post("/signin", validateSchema(loginSchema), signIn);

router.get("/verify", verifyToken);

router.post("/signout", signOut);

module.exports = router;
