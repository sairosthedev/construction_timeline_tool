const express = require('express');
const { getProjects, createProject, deleteProject, updateProject } = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to get all projects for a user
router.get('/', authMiddleware, getProjects);

// Route to create a new project
router.post('/', authMiddleware, createProject);

// Route to delete a project
router.delete('/:id', authMiddleware, deleteProject);

// Route to update a project
router.put('/:id', authMiddleware, updateProject);

module.exports = router;
