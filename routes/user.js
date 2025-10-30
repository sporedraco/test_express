const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
    res.json({ "Messages": 'User routes' });
});

router.post('/user', (req, res) => {
    console.log(req.body);
    res.json({ "Messages": 'User created' });
});

module.exports = router;