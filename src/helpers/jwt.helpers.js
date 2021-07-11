const jwt = require("jsonwebtoken");

const createAccessJWT = (paylod) => {
  const accessJWT = jwt.sign({ paylod }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  return Promise.resolve(accessJWT);
};

const createRefreshJWT = (paylod) => {
  const refreshJWT = jwt.sign({ paylod }, process.env.JWT_ACCESS_SECRET, {expiresIn: '30d'});
  return Promise.resolve(refreshJWT);
};

module.exports = {
  createAccessJWT,
  createRefreshJWT,
};

/*

JWT_ACCESS_SECRET = 1KLAKJSDJFjflaksdfj^*aFAJSDJIEOW
JWT_ACCESS_SECRET = nmzxiwnzksjKJSDIUWM*^ASDsds(askdjafasda)
*/
