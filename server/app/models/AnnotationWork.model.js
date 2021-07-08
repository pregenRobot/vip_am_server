const Sequelize = require("sequelize");
const db = require("../config/db.config.js");
const User = require("./User.model.js");

const AnnotationWork = db.define("annotation_work", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uploadFileName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    originalFileName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    message: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    processStatus: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    uploadedAt: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    processFinishedAt: {
        type: Sequelize.DATE,
        allowNull: false,
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

AnnotationWork.belongsTo(User, { foreign_key: "uploaderId" });

module.exports = AnnotationWork;