const query = require('./query');

const findByUsername = (username) => {
    return query(`select * from users where name = '${username}'`);
};

const insert = (username, password) => {
    return query(`insert into users (name, password) values ('${username}', '${password}');`);
};

module.exports = { findByUsername, insert };
