const userModel = require("./user.mongo");

async function createNewUser(user) {
  try {
    const { firstname, email, password } = user;

    const hashedPassword = await userModel.hashPassword(password);
    const newUser = userModel.create({
      firstname,
      email,
      password: hashedPassword,
    });
    return newUser;
  } catch (error) {
    console.log("error in creating new user", error);
    throw error;
  }
}

module.exports = { createNewUser };
