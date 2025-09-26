const fs = require("fs");
const Team = require("../models/team.model");
const jsonData = fs.readFileSync("./seedData/team.json", "utf-8");
const teamData = JSON.parse(jsonData);

async function seedTeam() {
  try {
    for (const team of teamData) {
      const newTeam = new Team({
        name: team.name,
        description: team.description,
      });
      await newTeam.save();
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

module.exports = seedTeam;
