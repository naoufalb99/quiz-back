const { Sequelize } = require('sequelize')
const dbConfig = require('../configs/db.config')

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.hostname,
  port: dbConfig.port,
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'production' ? false : console.log
})

module.exports = sequelize
