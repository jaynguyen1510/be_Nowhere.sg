// Router for user Login
const loginUser = async (req, res) => {};

// Router for user Register
const registerUser = async (req, res) => {
  res.json({ msg: "register api working" });
};

// Router for admin login
const adminLogin = async (req, res) => {};

module.exports = { loginUser, registerUser, adminLogin };
