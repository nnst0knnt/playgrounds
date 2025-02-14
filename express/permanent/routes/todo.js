const router = require('express').Router();
const todosRepo = require('../repositories/todos');

router.get('/', async (req, res) => {
  const todos = await todosRepo.get(req.session.userId);
  res.render('todo', { todos });
});

router.post('/', async (req, res) => {
  await todosRepo.insert(req.session.userId, req.body.content);
  res.redirect('/');
});

module.exports = router;
