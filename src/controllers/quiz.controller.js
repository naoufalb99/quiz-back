const quizService = require('../services/quiz.service')

module.exports = {
  getSingleQuiz: async (req, res) => {
    const { quizId } = req.params

    const quiz = await quizService.getQuizById(quizId)

    return res.json(quiz)
  },
  startQuizAttempt: async (req, res) => {
    const { quizId } = req.params
    const { userId } = req.body

    const attempt = await quizService.startQuizAttempt(userId, quizId)

    return res.json(attempt)
  },
  finishQuizAttempt: async (req, res) => {
    const { quizId } = req.params
    const { userId, selectedAnswers } = req.body

    const attempt = await quizService.finishQuizAttempt(quizId, userId, selectedAnswers)

    return res.json(attempt)
  }
}
