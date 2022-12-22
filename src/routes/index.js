var express = require('express');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const fetch = require("node-fetch")
const { User } = require("../schema/user_schema")
const { Data } = require("../schema/data_schema")

// const getUnsplashList = ( query ) => {
//   return fetch(`${ process.env.UNSPLASH_BASE_URL }/search/photos?client_id=${ process.env.UNSPLASH_ACCESS_KEY }&page=1&per_page=10&query=${ query }}`)
//       .then( response => response.json())
//       .then( ({ results }) => results )
//       .catch( err => console.log( err ) )
// }

const getUnsplashList = ( query ) => {
  return fetch(`${ process.env.UNSPLASH_BASE_URL }/search/photos?client_id=${ process.env.UNSPLASH_ACCESS_KEY }&page=1&per_page=10&query=${ query }}`)
      .then( response => response.json())
      .then( ({ results }) => results )
      .catch( err => console.log( err ) )
}

router.get('/',  (req, res) => {

  Data
    .find()
    .then( dataResult => {
      const newSearch = dataResult[0].data
      getUnsplashList(newSearch)
        .then( results => {
          if( req.oidc.user ){
            const [ , sub_id ] = req.oidc.user.sub.split("|")
            User
              .find({ sub_id })
              .populate("favorited")
              .then( usersResults => {
                let usersFavs = (usersResults[0].favorited)
                  ? [ ...usersResults[0].favorited ]
                  : []
    
                res.render('index', { 
                  userProfile: req.oidc.user,
                  usersFavList: usersFavs,
                  list: results,
                });
    
              })
              .catch( err => console.log(err) )
          }
          else {
            res.render('index', { 
              userProfile: req.oidc.user,
              list: results,
            });
          }
        })
        .catch( err => console.log(err) )
    })
    .catch( err => console.log(err) )

});

router.post("/", (req, res) => {
  let { userInput } = req.body
  Data
    .findOneAndReplace({},{data: userInput},{new:true})
    .then( dataResult => {
      res.redirect('/')
    })
    .catch( err => console.log(err) )

})

router.get('/profile', requiresAuth(), (req, res) => {
  res.render('profile.ejs',{
    userProfile: req.oidc.user,
    title: 'Profile page'
  });
});

module.exports = router;
