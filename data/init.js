const User = require('../models/users.model');

const userJsonList = require("./test-users");

const importUsers = async () => {
    await User.create(userJsonList);
    console.log('Users successfully loaded');
};

const deleteAllUsers = async () => {
  await User.deleteMany();
  console.log('Users successfully deleted');
};

const initUsers = async () => {
    await deleteAllUsers();
    importUsers();
} 

module.exports = initUsers;