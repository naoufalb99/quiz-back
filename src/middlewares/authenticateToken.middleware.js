const { User } = require('../models/user.model')
const jwt = require('jsonwebtoken')
const generalConfig = require('../configs/general.config')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, generalConfig.JWTSecret, async (err, { userId }) => {
    if (err) return res.sendStatus(403)

    const user = await User.findByPk(userId)
    if (user === null) return res.sendStatus(403)
    else req.user = user

    next()
  })
}
