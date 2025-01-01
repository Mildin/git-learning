const mongoose = require('mongoose');
const Course = require('../models/courseModel');
require('dotenv').config({ path: './.env' });
require('../config/db');

// Add a new course
exports.addCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({ status: 'success', message: 'Course added successfully', data: newCourse });
  } catch (err) {
    console.error('Error adding course:', err.message);
    if (err.name === 'ValidationError') {
      res.status(400).json({ status: 'failed', message: 'Validation Error', error: err.errors });
    } else {
      res.status(500).json({ status: 'failed', message: 'Internal Server Error', error: err.message });
    }
  }
};

// View a course by short name
exports.viewCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ short_name: req.params.shortName });
    if (course) {
      res.status(200).json({ status: 'success', data: course });
    } else {
      res.status(404).json({ status: 'failed', message: `Course with short_name "${req.params.shortName}" not found` });
    }
  } catch (err) {
    console.error('Error fetching course:', err.message);
    res.status(500).json({ status: 'failed', message: 'Internal Server Error', error: err.message });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findOneAndUpdate(
      { short_name: req.params.shortName },
      req.body,
      { new: true }
    );
    if (updatedCourse) {
      res.status(200).json({ status: 'success', message: 'Course updated successfully', data: updatedCourse });
    } else {
      res.status(404).json({ status: 'failed', message: `Course with short_name "${req.params.shortName}" not found` });
    }
  } catch (err) {
    console.error('Error updating course:', err.message);
    if (err.name === 'CastError') {
      res.status(400).json({ status: 'failed', message: 'Invalid Data', error: err.message });
    } else {
      res.status(500).json({ status: 'failed', message: 'Internal Server Error', error: err.message });
    }
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const result = await Course.deleteOne({ short_name: req.params.shortName });
    if (result.deletedCount > 0) {
      res.status(200).json({ status: 'success', message: 'Course deleted successfully' });
    } else {
      res.status(404).json({ status: 'failed', message: `Course with short_name "${req.params.shortName}" not found` });
    }
  } catch (err) {
    console.error('Error deleting course:', err.message);
    res.status(500).json({ status: 'failed', message: 'Internal Server Error', error: err.message });
  }
};
