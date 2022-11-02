const userService = require('../services/user.service')

module.exports = {
  signUp: async (req, res) => {
    const { firstName, lastName, phone, email } = req.body

    const user = await userService.signUp({ firstName, lastName, phone, email })

    return res.json(user)
  }
}
