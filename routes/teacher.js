const express = require("express");
const router = express.Router();
const multer = require("multer");

const teacher = require("../models/teacher")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/get-all-teachers", async (req, res) => {
    try {
      const teachers= await teacher.find().sort({ createdAt: -1 });
      res.json(teachers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post("/create-new-teacher",  upload.single("image"), async(req,res) =>{
    try{
        const {full_name, description, email, campus, faculty, imgURL} = req.body;

        const newTeacher = new teacher({
            full_name,
            description,
            image: imgURL,
            email,
            campus,faculty
        });

        await newTeacher.save();

        console.log(newTeacher);
    res.status(200).json({
      success: true,
      message: "teacher created successfully",
      teachers: newTeacher,
    });
    }catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})

router.put("/update-teacher/:id", upload.single("image"), async (req, res) => {
  try {
    const { full_name, description, email, campus, faculty, imgURL } = req.body;

    const updateFields = {
      full_name,
      description,
      email,
      campus,
      faculty,
      image: imgURL
    };

    const updatedTeacher = await teacher.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!updatedTeacher) {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }

    res.status(200).json({
      success: true,
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.delete("/delete-teacher/:id", async (req, res) => {
  try {
    const deletedteacher = await teacher.findByIdAndDelete(req.params.id);
    res.status(200).json({success: true, message: deletedteacher})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/search', async (req, res) => {
  const searchQuery = req.query.email; 

  try {
    const teachers = await teacher.findOne({ email: { $regex: searchQuery, $options: 'i' } }); 
    res.json(teachers); 
  } catch (err) {
    res.status(500).json({ error: 'Error occurred while searching for teachers' });
  }
});

  module.exports = router;