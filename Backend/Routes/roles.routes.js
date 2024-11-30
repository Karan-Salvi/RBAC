// backend/routes/roles.js
const express = require("express");
const Role = require("../Models/role.model.js");
const router = express.Router();

// Get all roles
router.get("/", async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new role
router.post("/", async (req, res) => {
  const { name, permissions } = req.body;
  const newRole = new Role({ name, permissions });
  try {
    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Edit a role
router.put("/:id", async (req, res) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a role
router.delete("/:id", async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
