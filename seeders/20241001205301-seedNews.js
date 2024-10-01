"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const news = require("../data/news.json").map(element => {
      element.createdAt = new Date()
      element.updatedAt = new Date()
      return element
    });

    await queryInterface.bulkInsert("News", news);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("News", null);
  },
};
