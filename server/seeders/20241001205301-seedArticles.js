"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const article = require("../data/articles.json").map(element => {
      element.createdAt = new Date()
      element.updatedAt = new Date()
      return element
    });

    await queryInterface.bulkInsert("Articles", article);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Articles", null);
  },
};
