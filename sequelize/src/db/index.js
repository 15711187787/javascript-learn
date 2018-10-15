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
    // 设置时区
    timezone: '+08:00',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // define: {
    // 全局设置引擎, 默认是 InnoDB
    //     engine: 'MYISAM', 
    // 全局设置 类 级别的函数
    //     classMethods: {
    //         method1: function () {},
    //         method2: function () {}
    //     },
    // 全局设置 实例 级别的函数
    //     instanceMethods: {
    //         method3: function () {}
    //     }
    // }

    // SQLite only
    // storage: 'path/to/database.sqlite'
});

module.exports = sequelize;