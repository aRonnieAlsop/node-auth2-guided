const jwt = require('jsonwebtoken') 
const {} = require('../../config')
// AUTHENTICATION
const restricted = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
       if (err) {
        next({ status: 401, message: `token bad: ${err.message}`}) //for development purposes
       } else {
        //going to tack token to req object here for middlewares down road
        req.decodedJwt = decoded
        next()
       }
    })
  } else {
    next({ status: 401, message: 'what? no token?'})
  }
}

// AUTHORIZATION
const checkRole = role => (req, res, next) => {
  if (req.decodedJwt && req.decodedJwt.role === role){
    next()
  } else {
    next({ status: 403, message: 'you have no power here!' })
  }
}

module.exports = {
  restricted,
  checkRole,
}
