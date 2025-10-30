const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
    res.json({ "Messages": 'User routes' });
});

module.exports = router;