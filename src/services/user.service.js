const { Op } = require('sequelize')
const { User } = require('../models')

module.exports = {
  getAllUsers: () => User.findAll(),
  signUp: async ({ firstName, lastName, phone, email }) => {
    const user = await User.findOne({ where: { [Op.or]: [{ phone }, { email }] } })
    if (user === null) {
      return await User.create({ firstName, lastName, phone, email })
    } else {
      user.set({ firstName, lastName, phone, email })
      return await user.save()
    }
  }
}
