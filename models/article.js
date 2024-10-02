'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      Article.belongsTo(models.User)
    }
  }
  Article.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "title is required"
        },
        notEmpty: {
          msg: "title is required"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "description is required"
        },
        notEmpty: {
          msg: "description is required"
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "imageUrl is required"
        },
        notEmpty: {
          msg: "imageUrl is required"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "UserId is required"
        },
        notEmpty: {
          msg: "UserId is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};