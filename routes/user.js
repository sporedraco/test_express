const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
    res.json({ "Messages": 'User routes' });
});

router.post('/user', (req, res) => {
    let userData = req.body;
    console.log('Données utilisateur reçues :', userData);
    res.json({ "Messages": 'User created' });
});

module.exports = router;