const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const faculty = require("../models/faculty");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Get all faculties
router.get("/get-all-faculties", async (req, res) => {
  try {
    const faculties = await faculty.find().sort({ createdAt: -1 });
    res.json(faculties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new faculty
router.post("/create-new-faculty", upload.single("image"), async (req, res) => {
  try {
    const { name, campus, description } = req.body;
    const newFaculty = new faculty({
      name,
      campus,
      description,
    });

    await newFaculty.save();

    res.status(200).json({
      success: true,
      message: "Faculty created successfully",
      faculty: newFaculty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Update faculty
router.put("/update-faculty/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, campus, description } = req.body;
    const facultyToUpdate = await faculty.findById(req.params.id);

    if (!facultyToUpdate) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    facultyToUpdate.name = name || facultyToUpdate.name;
    facultyToUpdate.campus = campus || facultyToUpdate.campus;
    facultyToUpdate.description = description || facultyToUpdate.description;

    
    await facultyToUpdate.save();

    res.status(200).json({
      success: true,
      message: "Faculty updated successfully",
      faculty: facultyToUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Delete faculty
router.delete("/delete-faculty/:id", async (req, res) => {
  try {
    const facultyToDelete = await faculty.findById(req.params.id);

    if (!facultyToDelete) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    await faculty.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get faculties by campus
router.get("/get-faculties-by-campus", async (req, res) => {
  const campusName = req.query.campus;
  try {
    const faculties = await faculty.find({ campus: campusName });
    res.json(faculties);
  } catch (error) {
    res.status(500).send("Error fetching faculties");
  }
});

module.exports = router;
