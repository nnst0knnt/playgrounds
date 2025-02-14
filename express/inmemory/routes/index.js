const router = require('express').Router();

const todos = [];

router.get('/', (_, res) => {
  res.render('index', { todos });
});

router.post('/', (req, res) => {
  todos.push({
    id: Date.now(),
    content: req.body.content,
  });
  res.redirect('/');
});

module.exports = router;
