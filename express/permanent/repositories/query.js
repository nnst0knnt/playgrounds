const pool = require("mysql").createPool({
	host: "127.0.0.1",
	user: "user@app",
	password: "password@express",
	database: "app",
});
pool.query = require("util").promisify(pool.query);

const query = (sql, values) => {
	try {
		return pool.query(sql, values);
	} catch (e) {
		console.error(e);

		throw new Error("データベースのクエリ実行に失敗しました");
	}
};

module.exports = query;
