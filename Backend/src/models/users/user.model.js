const userModel = require("./user.mongo");

async function createNewUserreateNewUser({ fullname, email, password }) {
  const user = userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
}

module.exports = { createNewUser };
