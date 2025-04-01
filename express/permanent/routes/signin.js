const router = require("express").Router();
const usersRepo = require("../repositories/users");

router.get("/", (_, res) => {
	res.render("signin");
});

router.post("/", async (req, res) => {
	try {
		const { username, password } = req.body;

		const foundUser = (await usersRepo.findByUsername(username))[0];

		if (
			!foundUser ||
			!(await require("bcrypt").compare(password, foundUser.password))
		) {
			return res.render("signin", {
				error: "ユーザが見つかりません",
			});
		}

		req.session.userId = foundUser.id;
		res.redirect("/");
	} catch (e) {
		res.render("signin", { error: "サインインに失敗しました" });
	}
});

module.exports = router;
