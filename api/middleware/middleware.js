const Users = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.url
  console.log({timestamp,method,url})
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try{
    const user = await Users.getById(req.params.id)
    !user?
      res.status(404).json({ message: "user not found"})
    : 
    req.user = user
    next()
  } catch(err){
    res.status(500).end()

  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const {name} = req.body
  !name?
  res.status(400).json({
    message: "missing required name field"
  }):
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
 const {text} = req.body
 !text?
 res.status(400).json({
  message: "missing required text field" 
 }) :
 next()
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost };
