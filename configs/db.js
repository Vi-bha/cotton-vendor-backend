// const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const connection = await mysql.createConnection({ 
        host:process.env.HOST, 
        port:process.env.SQL_SERVER_PORT, 
        user:process.env.USER, 
        password:process.env.PASSWORD });
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DATABASE}\`;`);

    // connect to db
    const sequelize = new Sequelize(process.env.DATABASE,process.env.USER ,process.env.PASSWORD , { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);

    // sync all models with database
    await sequelize.sync();
}