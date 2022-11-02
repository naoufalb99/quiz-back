const sequelize = require('./_sequelize')
const { DataTypes } = require('sequelize')

const Quiz = sequelize.define('Quiz', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timeLimit: {
    type: DataTypes.BIGINT,
    allowNull: false
  }
}, { underscored: true, table: 'quizzes' })

module.exports = { Quiz }
