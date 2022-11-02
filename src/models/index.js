const { User } = require('./user.model')
const { Quiz } = require('./quiz.model')
const { QuizAnswer } = require('./quizAnswer.model')
const { QuizAttempt } = require('./quizAttempt.model')
const { QuizAttemptAnswer } = require('./quizAttemptAnswer.model')
const { QuizQuestion } = require('./quizQuestion.model')

Quiz.hasMany(QuizQuestion)
QuizQuestion.belongsTo(Quiz)

QuizAttempt.hasMany(QuizAttemptAnswer, {
  foreignKey: 'attempt_id'
})
QuizAttempt.belongsTo(User, { targetKey: 'id', foreignKey: 'userId' })
QuizAttempt.belongsTo(Quiz, { targetKey: 'id', foreignKey: 'quizId' })

QuizAttemptAnswer.belongsTo(QuizAnswer, { targetKey: 'id', foreignKey: 'answerId' })
QuizAttemptAnswer.belongsTo(QuizQuestion, { targetKey: 'id', foreignKey: 'questionId' })
QuizAttemptAnswer.belongsTo(QuizAttempt, { targetKey: 'id', foreignKey: 'attemptId' })

QuizQuestion.hasMany(QuizAnswer, {
  foreignKey: 'question_id'
})

module.exports = { User, Quiz, QuizAnswer, QuizAttempt, QuizAttemptAnswer, QuizQuestion }
