const express = require("express");
const router = express.Router();
const Task = require("../models/task.model");

router.post("/", async (req, res) => {
  const { name, project, team, owners, tags, timeToComplete, status } =
    req.body;
  if (
    !name ||
    !project ||
    !team ||
    !owners ||
    !tags ||
    !timeToComplete ||
    !status
  ) {
    return res
      .status(400)
      .json({ error: "Required fields missing in request body." });
  }
  try {
    const newTask = new Task({
      name,
      project,
      team,
      owners,
      tags,
      timeToComplete,
      status,
    });
    await newTask.save();
    res.status(201).json({ task: newTask });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Server error while fetching tasks.",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
    //   .populate("project")
      .populate("team")
      .populate("owners");

    if (tasks.length != 0) {
      res.status(200).json({ tasks});
    } else {
      res.status(400).json({ error: "No tasks found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Something went wrong. Server error." });
  }
});

module.exports = router;
