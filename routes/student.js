const express = require("express");
const router = express.Router();
const multer = require("multer");

const student = require("../models/student")
const campus = require("../models/campus");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/get-all-students", async (req, res) => {
    try {
      const students= await student.find().sort({ createdAt: -1 });
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/get-student-by-id", async (req, res) => {
    try {
      const { _id } = req.query;
      
      if (!_id) {
        return res.status(400).json({ message: 'Student ID is required' });
      }
  
      const result = await student.findOne({ _id }); 
      
      if (!result) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  });

router.post("/create-new-student",  upload.single("image"), async(req,res) =>{
    try{
        const {full_name, description, email, campus, faculty, personal_email, MSSV, imgURL} = req.body;
        

        const newstudent = new student({
            full_name,
            description,
            image: imgURL,
            email,
            personal_email,
            MSSV,
            campus,
            faculty
        });

        await newstudent.save();

        console.log(newstudent);
    res.status(200).json({
      success: true,
      message: "student created successfully",
      students: newstudent,
    });
    }catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})

router.delete("/delete-student/:id", async (req, res) => {
  try {
    const deletedstudent = await student.findByIdAndDelete(req.params.id);
    console.log(deletedstudent)
    res.status(200).json({success: true, message: "Deleted successfully"})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/update-student/:id", upload.single("image"), async (req, res) => {
  try {
    const { full_name, description, email, campus, faculty, MSSV, personal_email, imgURL } = req.body;
    

    const updateFields = {
      full_name,
      description,
      email,
      campus,
      faculty,
      MSSV, personal_email,
      image:imgURL
    };

    const updatedStudent = await student.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get('/search', async (req, res) => {
  const searchQuery = req.query.MSSV; 

  try {
    const students = await student.findOne({ MSSV: { $regex: searchQuery, $options: 'i' } }); 
    res.json(students); 
  } catch (err) {
    res.status(500).json({ error: 'Error occurred while searching for students' });
  }
});

// Route to get students by campusID
router.get('/get-students-by-campus/:campusId', async (req, res) => {
  try {
      const { campusId } = req.params;
      
      const campusSelected = await campus.findById(campusId);

      if (!campusSelected) {
        return res.status(404).json({ message: 'Campus not found.' });
    }

      const students = await student.find({campus: campusSelected.name});
      
      if (students.length === 0) {
          return res.status(404).json({ message: 'No students found for this class.' });
      }
      
      res.json(students);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
