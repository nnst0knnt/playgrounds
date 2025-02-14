const router = require("express").Router();
const todosRepo = require("../repositories/todos");

router.get("/", async (req, res) => {
	try {
		const todos = await todosRepo.get(req.session.userId);
		res.render("todo", { todos });
	} catch (e) {
		res.render("todo", { todos: [], error: "タスクの取得に失敗しました" });
	}
});

router.post("/", async (req, res) => {
	let todos = [];

	try {
		todos = await todosRepo.get(req.session.userId);

		await todosRepo.insert(req.session.userId, req.body.content);
		res.redirect("/");
	} catch (e) {
		res.render("todo", { todos, error: "タスクの追加に失敗しました" });
	}
});

module.exports = router;
