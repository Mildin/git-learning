const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  short_name: String,
  full_name: String,
  summary: String,
  start_date: Date,
  end_date: Date,
});

courseSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v;  // Remove the `__v` field from the response
    return ret;
  },
});

// Specify the collection name as 'cm_course'
const Course = mongoose.model('Course', courseSchema, 'cm_course'); // Third argument is the collection name

module.exports = Course;
