const { Sequelize, Op } = require('sequelize')
const { QuizQuestion, Quiz, QuizAnswer, QuizAttempt, QuizAttemptAnswer } = require('../models')

const sequelize = require('../models/_sequelize')
const ValidationError = require('../utils/ValidationError')

const getQuizById = (id) => Quiz.findByPk(id, {
  include: [
    {
      model: QuizQuestion, include: QuizAnswer
    }
  ]
})

const startQuizAttempt = async (userId, quizId) => {
  const [attempt] = await QuizAttempt.findOrCreate({
    where: {
      userId,
      quizId
    },
    defaults: {
      startedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      score: 0
    }
  })

  return attempt
}

const finishQuizAttempt = async (quizId, userId, selectedAnswers) => {
  const transaction = await sequelize.transaction()
  try {
    const attempt = await QuizAttempt.findOne({
      where: {
        userId,
        quizId,
        startedAt: {
          [Op.ne]: null
        },
        finishedAt: null
      },
      transaction
    })

    if (attempt === null) {
      throw new ValidationError('Attempt not found.')
    }

    const quiz = await Quiz.findByPk(quizId, {
      include: [
        {
          model: QuizQuestion, include: QuizAnswer.unscoped()
        }
      ]
    })
    let score = 0
    const attemptAnswers = []
    quiz.QuizQuestions.forEach(question => {
      const correctAnswer = question.QuizAnswers.find(({ isCorrect }) => isCorrect)
      if (correctAnswer && selectedAnswers[question.id] === correctAnswer?.id) {
        score++
      }
      attemptAnswers.push({ attemptId: attempt.id, questionId: question.id, answerId: selectedAnswers[question.id] })
    })

    await attempt.update({
      score,
      finishedAt: Sequelize.literal('CURRENT_TIMESTAMP')
    }, { transaction })

    await QuizAttemptAnswer.bulkCreate(attemptAnswers, { transaction })

    await transaction.commit()

    return attempt
  } catch (error) {
    await transaction.rollback()
  }
}

module.exports = { getQuizById, startQuizAttempt, finishQuizAttempt }
