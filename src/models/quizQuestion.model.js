const sequelize = require('./_sequelize')
const { DataTypes } = require('sequelize')

const QuizQuestion = sequelize.define('QuizQuestion', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { underscored: true, table: 'quiz_questions' })

module.exports = { QuizQuestion }
