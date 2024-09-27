var express = require('express');
var router = express.Router();

/* GET menus listing. */
router.get('/menu', function(req, res, next) {
  res.send('respond with all menu items');
});


/* GET one menu item. */
router.get('/menu/:id', function(req, res, next) {
  res.send('respond with single menu item');
});

module.exports = router;
