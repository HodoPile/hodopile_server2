var express = require('express');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');


router.get('/favorite',function(req, res, next) {
  res.send('respond with a favorites resource');
});

router.put("/favorites", (req,res) => {})
router.delete("/favorites/:card_id", (req,res)=> res.send("NOT IMPLEMENTED"))

module.exports = router;