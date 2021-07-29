const Sequelize = require("sequelize");
const db = require("../config/db.config.js");
const User = require("./User.model.js");

const Encounter = db.define("encounter", {
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
    },
    flag: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

Encounter.belongsTo(User, { foreign_key: "addedByUserId" });

module.exports = Encounter;
