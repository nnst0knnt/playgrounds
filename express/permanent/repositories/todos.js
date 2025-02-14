const query = require('./query');

const get = (userId) => {
    return query(`select * from tasks where user_id = ${userId}`);
};

const insert = (userId, text) => {
    return query(`insert into tasks (user_id, content) values (${userId}, '${text}');`);
};

module.exports = { get, insert };
