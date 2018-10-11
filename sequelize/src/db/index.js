const Sequelize = require('sequelize');

const dbConfig = {
    database: 'test_sequelize',
    username: 'root',
    password: '123456',
    host: '127.0.0.1',
    dialect: 'mysql', // 'mysql'|'sqlite'|'postgres'|'mssql'
};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // SQLite only
    // storage: 'path/to/database.sqlite'
});

module.exports = sequelize;