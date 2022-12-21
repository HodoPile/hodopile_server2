var express = require('express');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');


router.get('/favorite',function(req, res, next) {
  res.send('respond with a favorites resource');
});

// router.put("/favorites", (req,res) => {
//     const { card, user } = req.body
//     const { card_id } = card
//     const filterCards = { card_id:card_id }
//     User
//         .findOneAndUpdate( 
//             { sub_id: user.sub_id },
//         )
//         .then( userRes => {
//             Favorite
//                 .findOneAndUpdate( 
//                     filterCards, 
//                     { $addToSet: { users: userRes._id } }, 
//                     { upsert: true })
//                 .then( favResult => {
//                     res.send( favResult )
//                 })
//                 .catch( err => console.log( err ))
//         })
//         .catch( err => console.log( err ))
// })
router.delete("/favorites/:card_id", (req,res)=> res.send("NOT IMPLEMENTED"))

module.exports = router;