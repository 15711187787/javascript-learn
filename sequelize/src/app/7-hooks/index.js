/**
 * 钩子
 */
const sequelize = require('sequelize');
const db = require('../../db');

const {
    INTEGER,
    STRING,
} = sequelize;

const Role = db.define(
    'role', {
        role_id: {
            type: INTEGER.UNSIGNED,
            allowNull: false,
        },
        role_name: {
            type: STRING(32),
            allowNull: false,
            unique: true,
            validate: {
                min: 4,
                max: 32,
            },
        },
        level: {
            type: INTEGER,
            defaultValue: 1,
        },
    }, {
        underscored: true,
        paranoid: true,
        // 使用钩子方法1: 在定义的时候新增钩子
        hooks: {
            beforeCreate: (role, options) => {
                console.log('beforeCreate ...');
                role.level = 100;
            },
            // 可以写多个钩子
        }
    }
);

// 使用钩子方法2
Role.hook('beforeValidate', (role, options) => {
    console.log('beforeValidate ...');
});

// 使用钩子方法3
Role.afterCreate((role, options) => {
    console.log('afterCreate ...');
    console.log('role created success,', JSON.stringify(role));
});

const createTable = async () => {
    await Role.sync({
        force: true,
    });
};

const createRole = async () => {
    await Role.create({
        role_id: 1,
        role_name: 'name-1'
    });

    // 输出
    // beforeValidate ...
    // beforeCreate ...
    // Executing (default): INSERT INTO `roles` (`id`,`role_id`,`role_name`,`level`,`created_at`,`updated_at`) VALUES (DEFAULT,1,'name-1',100,'2018-10-15 17:08:52','2018-10-15 17:08:52');
    // afterCreate ...
    // role created success, {"level":100,"id":1,"role_id":1,"role_name":"name-1","updated_at":"2018-10-15T09:08:52.923Z","created_at":"2018-10-15T09:08:52.923Z"}
}

(async () => {
    console.log('------------- createTable');
    await createTable();
    console.log('------------- createRole');
    await createRole();
})();