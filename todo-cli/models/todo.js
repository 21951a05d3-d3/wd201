
"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");

const dateFormat = (d) => {
  return d.toISOString().slice(0, 10);
};
var dateToday = new Date();
const today = new Date().toISOString().slice(0, 10);
const yesterday = dateFormat(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = dateFormat(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    
    static async addTask(params) {
      // console.log(params);
      return await Todo.create(params);
    }

    static associate(models) {
      // define association here
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Todo list \n");
      const str3 = await Todo.display();
      console.log(str3);
      console.log("\n");

      console.log("Overdue");
      
      const overdues = await this.overdue();
      overdues.forEach((item) => {
        console.log(item.displayableString());
      });
      console.log("\n");

      console.log("Due Today");
      
      const todayDues = await this.dueToday();
      todayDues.forEach((item) => {
        console.log(item.displayableString());
      });
      console.log("\n");

      console.log("Due Later");
      
      const laterDues = await this.dueLater();
      laterDues.forEach((item) => {
        console.log(item.displayableString());
      });
      console.log("\n");
    }

    static async display() {
      const todos = await Todo.findAll();
      const todoList = todos.map((todo) => todo.displayableString()).join("\n");
      return todoList;
    }

    static async overdue() {
      
      const overDueItems = await this.findAll({
        where: {
          dueDate: { [Op.lt]: today },
        },
      });
      return overDueItems;
    }

    static async dueToday() {
      
      const dueTodayItems = await this.findAll({
        where: {
          dueDate: today,
        },
      });
      return dueTodayItems;
    }

    static async dueLater() {
      
      const dueLaterItems = await this.findAll({
        where: {
          dueDate: { [Op.gt]: today },
        },
      });
      return dueLaterItems;
    }

    static async markAsComplete(id) {
   
      const task = await Todo.findByPk(id);
      task.completed = true;
      return await task.save();
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      if (this.dueDate === today) {
        return `${this.id}. ${checkbox} ${this.title}`;
      } else {
        return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
      }
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
