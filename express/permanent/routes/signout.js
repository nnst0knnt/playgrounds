const router = require("express").Router();

router.get("/", (req, res) => {
	req.session = null;
	res.redirect("/signin");
});

module.exports = router;
