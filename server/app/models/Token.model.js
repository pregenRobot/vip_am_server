const Sequelize = require("sequelize");
const db = require("../config/db.config");
const User = require("./User.model");

const Token = db.define("tokens", {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        autoIncrement: true,
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    refreshToken: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
    },
});

Token.belongsTo(User, { foreign_key: "userId" });

module.exports = Token;