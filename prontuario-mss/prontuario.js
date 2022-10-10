const express = require('express');
const router = express.Router();

router.get('/prontuarios', (req, res) => {
    res.send('foi');
});

module.exports = router;