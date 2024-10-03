"use strict";
const { hashing } = require("../helpers/bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const user = require("../data/users.json").map((element) => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
      element.password = hashing(element.password);
      return element;
    });

    await queryInterface.bulkInsert("Users", user);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null);
  },
};
