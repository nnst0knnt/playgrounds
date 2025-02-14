const router = require('express').Router();

router.get('/', function (req, res) {
  req.session = null;
  res.redirect('/signin');
});

module.exports = router;
