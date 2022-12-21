var express = require('express');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const { User } = require("../schema/user_schema")
const { Favorite } = require("../schema/favorite_schema")


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
// router.get("/user/:sub_id", (req,res) => {
//   const { sub_id } = req.params
//   User
//       .find( sub_id )
//       .populate( "favorited" )
//       .then( result => res.send(result))
//       .catch( err => console.log(err) )
// })
router.put("/user", (req,res)=>{
  const [ , sub_id ] = req.oidc.user.sub.split("|")
  const { card_id, ...restOfCard } = req.body
  const filterCards = { card_id:card_id }
  const updateCard = { ...restOfCard }
  Favorite
      .findOneAndUpdate( filterCards, updateCard, { upsert: true, new: true })
      .then( favResult => {
        console.log(favResult)
          User
              .findOneAndUpdate( 
                  { sub_id: sub_id },
                  { $addToSet: { favorited: favResult._id } }
              )
              .then( result => {
                  console.log(result)
                  res.send( result )
              })
              .catch( err => console.log( err ))
      })
      .catch( err => console.log( err ))

})
router.delete("/user/:card_id", (req,res) => {
  const { card_id } = req.params
  const [ , sub_id ] = req.oidc.user.sub.split("|")
  // get favarited objectID
  // remove from users array

  Favorite
    .findOne({ card_id: card_id })
    .then( favResult => {
      const { _id  } = favResult
      User
        .updateOne(
          { sub_id:sub_id },
          { $pullAll: { favorited:[ _id ] }}, 
          { new: true }
        )
        .then( userResult => res.send( userResult ))
        .catch( err => console.log(err) )

    })
    .catch( err => console.log( err ) )

})

module.exports = router;
