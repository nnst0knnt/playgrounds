const query = require("./query");

const get = (userId) =>
	query("select * from tasks where user_id = ?", [userId]);

const insert = (userId, content) =>
	query("insert into tasks (user_id, content) values (?, ?)", [
		userId,
		content,
	]);

module.exports = { get, insert };
