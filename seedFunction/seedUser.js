const fs = require("fs");
const User = require("../models/user.model");
const jsonData = fs.readFileSync("./seedData/user.json", "utf-8");
const userData = JSON.parse(jsonData);

async function seedUser() {
  try {
    for (const user of userData) {
      const newUser = new User({
        name: user.name,
        email: user.email,
        password: user.password
      });
      await newUser.save();
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

module.exports = seedUser;
