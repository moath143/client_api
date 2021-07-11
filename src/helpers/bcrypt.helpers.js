const bcrypt = require('bcrypt');
const saltRounds = 10

const hashPassword = (plainPassword) => {
    return new Promise((resolve) => {
        resolve(bcrypt.hashSync(plainPassword, saltRounds))
    })
}

const comparePass = (plainPass, passFromDb) => {
  return new Promise((resolve, reject) => {
      bcrypt.compare(plainPass, passFromDb, (err, result) => {
          if (err) return reject(err)
          resolve(result)
    })
  });
};

module.exports = {
  hashPassword,
  comparePass,
};