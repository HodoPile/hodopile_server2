var express = require('express');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const fetch = require("node-fetch")
const { User } = require("../schema/user_schema")
const async = require("async");


const getUnsplashList = ( query ) => {
  return fetch(`${ process.env.UNSPLASH_BASE_URL }/search/photos?client_id=${ process.env.UNSPLASH_ACCESS_KEY }&page=1&per_page=10&query=${ query }}`)
      .then( response => response.json())
      .then( ({ results }) => results)
      .catch( err => console.log( err ) )
}    

router.get('/', (req, res) => {

    getUnsplashList('Africa')
      .then( results => {
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

      })
      .catch( err => console.log(err) )

});

router.get('/profile', requiresAuth(), (req, res) => {
  res.render('profile.ejs',{
    userProfile: req.oidc.user,
    title: 'Profile page'
  });
});

module.exports = router;
