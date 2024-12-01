// backend/routes/roles.js
const express = require("express");
const Role = require("../Models/role.model.js");
const router = express.Router();

// Get all roles
router.get("/roles", async (req, res) => {
  try {
    const roles = await Role.find({});
    if (!roles) {
      res.status(500).json({
        success: false,
        message: "Something went wrong..",
      });
    }
    res.json({
      success: true,
      message: "Roles fetched successfully",
      data: roles,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add a new role
router.post("/roles/create", async (req, res) => {
  const { name, permissions } = req.body;
  const newRole = new Role({ name, permissions });
  try {
    const savedRole = await newRole.save();
    return res.status(201).json({
      success: true,
      message: "User Role created successfully",
      data: savedRole,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Edit a role
router.put("/roles/:id", async (req, res) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    const updatedRoleList = await Role.find({});
    return res.status(201).json({
      success: true,
      message: "User Role created successfully",
      data: updatedRoleList,
      newUser: updatedRole,
    });
  } catch (error) {
    res.status(400).json({ success: true, message: error.message });
  }
});

// Delete a role
router.delete("/roles/:id", async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Role deleted successfully",
      data: deletedRole,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
