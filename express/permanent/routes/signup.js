const router = require('express').Router();
const usersRepo = require('../repositories/users');

router.get('/', (_, res) => {
    res.render('signup');
});

router.post('/', async (req, res) => {
    const {
        username,
        password,
        confirmPassword,
    } = req.body;

    if (password !== confirmPassword) {
        return res.render('signup', {
            error: 'パスワードが一致しません',
        });
    }

    const foundUser = await usersRepo.findByUsername(username);
    if (foundUser.length > 0) {
        return res.render('signup', {
            error: 'このユーザ名は既に使われています',
        });
    }

    const registeredUser = await usersRepo.insert(username, (await require("bcrypt").hash(password, 10)));
    req.session.userId = registeredUser.insertId;
    res.redirect('/');
});

module.exports = router;
