const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/studentDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const Student = mongoose.model("Student", studentSchema);

app.post("/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});

app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

app.put("/students/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(student);
});

app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send({ message: "Student deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
