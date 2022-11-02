const express = require('express')
const router = express.Router()

const quizController = require('../controllers/quiz.controller')
const userController = require('../controllers/user.controller')
// const authenticateTokenMiddleware = require('../middlewares/authenticateToken.middleware')

router.get('/quizzes/:quizId', quizController.getSingleQuiz)
router.post('/quizzes/:quizId/attempt/start', quizController.startQuizAttempt)
router.post('/quizzes/:quizId/attempt/finish', quizController.finishQuizAttempt)

router.post('/users/signUp', userController.signUp)

module.exports = router
