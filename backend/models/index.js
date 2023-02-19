const dbConfig = require("../config");
const Sequelize = require("sequelize");
const db = {};

try {
  const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    //operatorsAliases: false,
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    },
    define: {
      timestamps: false
  }
  });
  

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.members = require("./member.model.js")(sequelize, Sequelize);
  
} catch {
  console.log("Error")
}


module.exports = db;


//Do not forget to add the sync () method in app.js.