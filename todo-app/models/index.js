Skip to content
Search or jump to…
Pull requests
Issues
Codespaces
Marketplace
Explore
 
@21951a05d3-d3 
Mahendar0701
/
wd201
Public
Fork your own copy of Mahendar0701/wd201
Code
Issues
Pull requests
Actions
Projects
Security
Insights
Beta Try the new code view
wd201/todo-cli/models/index.js /
@Mahendar0701
Mahendar0701 todo-cli
Latest commit 67aad97 last month
 History
 1 contributor
50 lines (44 sloc)  1.1 KB
 

"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
