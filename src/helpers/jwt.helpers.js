const jwt = require("jsonwebtoken");

const { setJWT, getJWT } = require("./redis.helpers");
const { stroeUserRefreshJWT } = require("../model/user/User.model");

const createAccessJWT = async (email, _id) => {
  try {
    const accessJWT = await jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    await setJWT(accessJWT, _id);
    return Promise.resolve(accessJWT);
  } catch (error) {
    return Promise.reject(error);
  }
};

const createRefreshJWT = async (email, _id) => {
  try {
    const refreshJWT = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30d",
    });
    const result = await stroeUserRefreshJWT(_id, refreshJWT);
    return Promise.resolve(refreshJWT);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = {
  createAccessJWT,
  createRefreshJWT,
};

/*

JWT_ACCESS_SECRET = 1KLAKJSDJFjflaksdfj^*aFAJSDJIEOW
JWT_ACCESS_SECRET = nmzxiwnzksjKJSDIUWM*^ASDsds(askdjafasda)
*/
