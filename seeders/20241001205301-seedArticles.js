"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const news = require("../data/articles.json").map(element => {
      element.createdAt = new Date()
      element.updatedAt = new Date()
      return element
    });

    await queryInterface.bulkInsert("Articles", news);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Articles", null);
  },
};
