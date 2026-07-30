const {
  registerUser,
  loginUser,
} = require("../services/auth.service");

const asyncHandler = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    data: user,
  });
});

const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "Login Successful",
    ...result,
  });
});

module.exports = {
  register,
  login,
};