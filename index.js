const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require('body-parser');

const projectRouter = require("./routes/project")
const campusRouter = require("./routes/campus")
const facultyRouter = require("./routes/faculty")
const teacherRouter = require("./routes/teacher")
const studentRouter = require("./routes/student")
const accountRouter = require('./routes/account');
const tagRouter = require('./routes/tag');
const commentRouter = require('./routes/comment');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));


app.use("/api/project", projectRouter);
app.use("/api/campus",campusRouter);
app.use("/api/faculty", facultyRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/student", studentRouter)
app.use('/api/account', accountRouter);
app.use('/api/tag', tagRouter);
app.use('/api/comment', tagRouter);

app.use("/uploads", express.static("uploads"));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});