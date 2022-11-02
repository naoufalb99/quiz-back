const sequelize = require('./_sequelize')
const { DataTypes } = require('sequelize')

const QuizAttemptAnswer = sequelize.define('QuizAttemptAnswer', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  }
}, { underscored: true, table: 'quiz_attempt_answers' })

module.exports = { QuizAttemptAnswer }
