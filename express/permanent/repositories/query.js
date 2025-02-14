const pool = require('mysql').createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'rootpassword',
    database: 'todo_app',
});
pool.query = require('util').promisify(pool.query);

const query = (sql) => {
    return pool.query(sql);
};

module.exports = query;
