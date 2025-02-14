const query = require("./query");

const findByUsername = (username) =>
	query("select * from users where name = ?", [username]);

const insert = (username, password) =>
	query("insert into users (name, password) values (?, ?)", [
		username,
		password,
	]);

module.exports = { findByUsername, insert };
