const express = require('express');
const {validateUserId,validateUser,validatePost} = require('../middleware/middleware')
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res,next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
  .then(user=>{
    res.json(user)
  })
  .catch(next)
});

router.get('/:id',validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/',validateUser, (req, res,next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
  .then(newUser=>{
    res.status(201).json(newUser)
  })
  .catch(next)
});

router.put('/:id',validateUserId,validateUser, (req, res,next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id,req.body)
  .then(updated=>{
    res.json(updated)
  })
  .catch(next)
});

router.delete('/:id',validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts',validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts',validateUserId,validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});
router.use((err,req,res,next)=>{
  res.status(err.status || 500).json({
    message:'unknown error'
  })
})

// do not forget to export the router
module.exports = router