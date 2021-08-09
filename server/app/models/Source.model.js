const Sequelize = require("sequelize");
const db = require("../config/db.config.js");
const User = require("./User.model");
const Encounter = require("./Encounter.model");

const Source = db.define("sources", {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        autoIncrement: true,
    },
    fileName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    filePath: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    fileSize: {
        type: Sequelize.INTEGER,
    },
    fileType: {
        type: Sequelize.STRING,
    },
    fileHash: {
        type: Sequelize.STRING,
    },
    fileDuration: {
        type: Sequelize.INTEGER,
    },
    dataStorageLocation: {
        type: Sequelize.STRING,
    },
    channelCount: {
        type: Sequelize.INTEGER,
    },
    samplingRate: {
        type: Sequelize.INTEGER,
    },
    description: {
        type: Sequelize.TEXT,
    },
    flag: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
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

User.hasMany(Source, {foreignKey: "addedByUserId",});
Encounter.hasMany(Source, {foreignKey: "fromEncounterId",});

module.exports = Source;