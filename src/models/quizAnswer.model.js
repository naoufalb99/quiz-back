const sequelize = require('./_sequelize')
const { DataTypes } = require('sequelize')

const QuizAnswer = sequelize.define('QuizAnswer', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isCorrect: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  underscored: true,
  table: 'quiz_answers',
  defaultScope: {
    attributes: {
      exclude: ['isCorrect']
    }
  }
})

module.exports = { QuizAnswer }
