/**
 * 事务
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
    }
);

const createTable = async () => {
    await Role.sync({
        force: true,
    });
};

(async () => {
    console.log('------------- createTable');
    await createTable();
})();