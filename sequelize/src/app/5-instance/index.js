/**
 * 实例 (批量)创建，更新，删除
 */
const sequelize = require('sequelize');
const db = require('../../db');

const {
    INTEGER,
    STRING,
    Op
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

const nonPersistent = async () => {
    const role = Role.build({
        role_id: 1,
        role_name: 'name-1'
    });
    console.log(JSON.stringify(role));
    await role.save();
    console.log(JSON.stringify(role));
}

const persistent = async () => {
    const role = await Role.create({
        role_id: 2,
        role_name: 'name-2',
    });
    console.log(JSON.stringify(role));
}

const bulkCreateUsage = async () => {
    const l = [];
    for (let i = 0; i < 5; i++) {
        l.push({
            role_id: 1000 + i,
            role_name: `bulkname-${i}`,
            level: i + 5,
        });
    }

    // 指定了 fields 后，前面设置的 level 值就无效了
    // 此时, level 取的是默认值 1
    const result = await Role.bulkCreate(l, {
        fields: ['role_id', 'role_name']
    });
    console.log('result:', JSON.stringify(result));
    // 输出
    // Executing (default): INSERT INTO `roles` (`id`,`role_id`,`role_name`,`level`,`created_at`,`updated_at`) VALUES (NULL,1000,'bulkname-0',1,'2018-10-15 15:38:29','2018-10-15 15:38:29'),(NULL,1001,'bulkname-1',1,'2018-10-15 15:38:29','2018-10-15 15:38:29'),(NULL,1002,'bulkname-2',1,'2018-10-15 15:38:29','2018-10-15 15:38:29'),(NULL,1003,'bulkname-3',1,'2018-10-15 15:38:29','2018-10-15 15:38:29'),(NULL,1004,'bulkname-4',1,'2018-10-15 15:38:29','2018-10-15 15:38:29');
    // result: [{"id":1,"role_id":1000,"role_name":"bulkname-0","level":1,"created_at":"2018-10-15T07:38:29.902Z","updated_at":"2018-10-15T07:38:29.902Z"},{"id":2,"role_id":1001,"role_name":"bulkname-1","level":1,"created_at":"2018-10-15T07:38:29.902Z","updated_at":"2018-10-15T07:38:29.902Z"},{"id":3,"role_id":1002,"role_name":"bulkname-2","level":1,"created_at":"2018-10-15T07:38:29.902Z","updated_at":"2018-10-15T07:38:29.902Z"},{"id":4,"role_id":1003,"role_name":"bulkname-3","level":1,"created_at":"2018-10-15T07:38:29.902Z","updated_at":"2018-10-15T07:38:29.902Z"},{"id":5,"role_id":1004,"role_name":"bulkname-4","level":1,"created_at":"2018-10-15T07:38:29.902Z","updated_at":"2018-10-15T07:38:29.902Z"}]
}

const updateUsage = async () => {
    // 更新全部, 可以设定 where 条件
    const result = await Role.update({
        level: 4
    }, {
        where: {}
    });
    console.log('result: ', JSON.stringify(result));
    // 输出: result:  [2]

    // 更新实例
    const role = await Role.findOne({
        where: {
            id: 1
        }
    });
    const result2 = await role.update({
        level: 5
    });
    console.log('result2: ', JSON.stringify(result2));
    // 输出 result2:  {"id":1,"role_id":1,"role_name":"name-1","level":5,"created_at":"2018-10-15T06:36:26.000Z","updated_at":"2018-10-15T06:51:07.935Z","deleted_at":null}

    // 更新未写入数据库的实例
    const role3 = Role.build({
        role_id: 3,
        role_name: 'name-3',
    });
    const result3 = await role3.update({
        role_id: 4,
        role_name: 'name-4',
        level: 4,
    });
    console.log('result3: ', JSON.stringify(result3));
    // 实际上相当于写入了一条 更新后的数据 
    // Executing (default): INSERT INTO `roles` (`role_id`,`role_name`,`level`,`updated_at`,`created_at`) VALUES (4,'name-4',4,'2018-10-15 06:57:28','2018-10-15 06:57:28');
}

const deleteUsage = async () => {
    // 因为我们开启了软删除, paranoid: true, 因此数据不会被真正的删除
    // 只是更新了 deleted_at 时间而已
    const result1 = await Role.destroy({
        where: {
            id: 1
        }
    });
    console.log('result1:', result1);
    // 输出
    // Executing (default): UPDATE `roles` SET `deleted_at`='2018-10-15 15:02:50' WHERE `deleted_at` IS NULL AND `id` = 1
    // result1: 1

    // 也可以对具体的实例进行删除
    const role2 = await Role.findOne({
        where: {
            id: 3
        }
    });
    // 可以设置 force: true, 使得数据真正从数据库中删除
    const result2 = await role2.destroy({
        force: true
    });
    console.log('result2:', result2);
    // 输出:
    // DELETE FROM `roles` WHERE `id` = 3 LIMIT 1

    const result3 = Role.build({
        role_id: 5,
        role_name: 'name-5'
    }).destroy();
    console.log('result3:', result3);
}

const incrementUsage = async () => {
    const role = await Role.findById(1);
    const result = await role.increment('level', {
        by: 5
    });
    console.log('result:', JSON.stringify(result));
    // 输出
    // Executing (default): UPDATE `roles` SET `level`=`level`+ 5,`updated_at`='2018-10-15 16:04:35' WHERE `id` = 1
    // result: {"id":1,"role_id":1000,"role_name":"bulkname-0","level":1,"created_at":"2018-10-15T07:52:06.000Z","updated_at":"2018-10-15T07:52:06.000Z","deleted_at":null}   
}


(async () => {
    console.log('------------- createTable');
    await createTable();
    console.log('------------- nonPersistent');
    await nonPersistent();
    console.log('------------- persistent');
    await persistent();
    console.log('------------- bulkCreateUsage');
    await bulkCreateUsage();
    console.log('------------- updateUsage');
    await updateUsage();
    console.log('------------- deleteUsage');
    await deleteUsage();
    console.log('------------- incrementUsage');
    await incrementUsage();
})();