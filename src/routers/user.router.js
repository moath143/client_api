const express = require("express");

const router = express.Router();


const { hashPassword, comparePass } = require("../helpers/bcrypt.helpers");

const { insertUser, getUserByEmail } = require("../model/user/User.model");

const { createAccessJWT, createRefreshJWT } = require("../helpers/jwt.helpers");

// Create new user router

router.post("/", async (req, res, next) => {
  const { name, company, address, email, phone, password } = req.body;

  try {
    const hashedPass = await hashPassword(password);

    const newUserObj = {
      name,
      company,
      address,
      email,
      phone,
      password: hashedPass,
    };

    const result = await insertUser(newUserObj);
    console.log(result);
    res.json({ message: "New User Created", result });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: error.message });
  }
});

// User sign in router

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  //hash our password and compaire with the DB one

  if (!email || !password) {
    res.json({ status: "error", message: "Invalid form submission " });
  }
  //get user with email from DB
  const user = await getUserByEmail(email);

  const passFromDb = user && user._id ? user.password : null;

  if (!passFromDb)
    return res.json({ status: "error", message: "Invalid email or password " });

  const result = await comparePass(password, passFromDb);

  if (!result) {
    return res.json({ status: "error", message: "Invalid email or password " });
  }

  const accessJWT = await createAccessJWT(user.email, `${user._id}`);
  const refreshJWT = await createRefreshJWT(user.email, `${user._id}`);


  res.json({
    status: "success",
    message: "login successfully!!",
    accessJWT,
    refreshJWT,
  });
});

module.exports = router;
