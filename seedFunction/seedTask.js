const fs = require("fs");
const Task = require("../models/task.model");
const jsonData = fs.readFileSync("./seedData/task.json", "utf-8");
const taskData = JSON.parse(jsonData);

async function seedTask() {
  try {
    for (const task of taskData) {
      const newTask = new Task({
        name: task.name,
        project: task.project,
        team: task.team,
        owners: task.owners,
        tags: task.tags,
        timeToComplete: task.timeToComplete,
        status: task.status,
      });
      await newTask.save();
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

module.exports = seedTask;
