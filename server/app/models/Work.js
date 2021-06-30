const Sequelize = require("sequelize");
const db = require("../config/db.config.js");


const Work = db.define("work", {
    type: {
        type: Sequelize.STRING
    },
    worker: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    data: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
})


module.exports = Work;