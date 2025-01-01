const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Route to add a new course
router.post('/course', courseController.addCourse);

// Route to view a course by short name
router.get('/view/:shortName', courseController.viewCourse);

// Route to update a course by short name
router.put('/update/:shortName', courseController.updateCourse);

// Route to delete a course by short name
router.delete('/delete/:shortName', courseController.deleteCourse);

module.exports = router;
