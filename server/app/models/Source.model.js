const Sequelize = require("sequelize");
const db = require("../config/db.config.js");
const User = require("./User.model");
const Encounter = require("./Encounter.model");

const Source = db.define("source", {
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
    encounterDatetime: {
        type: Sequelize.DATE,
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

Source.belongsTo(User, {foreignKey: "addedByUserId",});
Source.belongsTo(Encounter, {foreignKey: "encounterId",});

module.exports = Source;