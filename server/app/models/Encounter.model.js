const Sequelize = require("sequelize");
const db = require("../config/db.config.js");
const User = require("./User.model.js");

const Encounter = db.define("encounters", {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        autoIncrement: true,
    },
    encounterNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    speciesName: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    latitude: {
        type: Sequelize.FLOAT,   
    },
    longitude: {
        type: Sequelize.FLOAT,
    },
    country: {
        type: Sequelize.TEXT,
    },
    region: {
        type: Sequelize.TEXT,
    },
    distanceFromSurveyVessel: {
        type: Sequelize.TEXT,
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: "",
    },
    flag: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    encounterDateTime: {
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

User.hasMany(Encounter, { foreignKey: "addedByUserId" });

module.exports = Encounter;
