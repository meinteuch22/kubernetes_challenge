var router = require('express').Router();

router.get('/', (req, res) => {

    res.json({
        message: 'all is well !',
    });
});

module.exports = router;

