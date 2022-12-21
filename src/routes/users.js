var express = require('express');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');


router.get('/user',function(req, res) {
  res.send('respond with a users resource');
});

// app.get("/user", (req,res) => {
//   User
//       .find({})
//       .populate("favorited")
//       .then( result => res.send( result ))
//       .catch( err => console.log(err) )
// })
// app.get("/user/:sub_id", (req,res) => {
//   const { sub_id } = req.params
//   User
//       .find( sub_id )
//       .populate( "favorited" )
//       .then( result => res.send(result))
//       .catch( err => console.log(err) )
// })
// app.put("/user", (req,res)=>{
//   const { card, user } = req.body
//   const { card_id, ...restOfCard } = card
//   const filterCards = { card_id:card_id }
//   const updateCard = { ...restOfCard }
//   Favorite
//       .findOneAndUpdate( filterCards, updateCard, { new: true, upsert: true })
//       .then( favResult => {
//           User
//               .findOneAndUpdate( 
//                   { sub_id: user.sub_id },
//                   { $addToSet: { favorited: favResult._id } }
//               )
//               .then( result => {
//                   res.send( result )
//               })
//               .catch( err => console.log( err ))
//       })
//       .catch( err => console.log( err ))
// })

module.exports = router;
