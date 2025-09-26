const fs = require("fs");
const Project = require("../models/project.model");
const jsonData = fs.readFileSync("./seedData/project.json", "utf-8");
const projectData = JSON.parse(jsonData);

async function seedProject() {
  try {
    for (const project of projectData) {
      const newProject = new Project({
        name: project.name,
        description: project.description,
      });
      await newProject.save();
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

module.exports = seedProject;
