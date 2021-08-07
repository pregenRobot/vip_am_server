const Sequelize = require("sequelize");

const dbConfig = {
    DB: "vip_am",
    USER: "root",
    PASSWORD: "",
    HOST: "localhost",
    DIALECT: "mysql",
    OPERATOR_ALIASES: false,
    POOL: {
        MAX: 5,
        MIN: 0,
        ACQUIRE: 30000,
        IDLE: 10000,
    },
};

module.exports = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    operatorsAliases: dbConfig.OPERATOR_ALIASES,
    pool: {
        max: dbConfig.POOL.MAX,
        min: dbConfig.POOL.MIN,
        acquire: dbConfig.POOL.ACQUIRE,
        idle: dbConfig.POOL.IDLE,
    },
});