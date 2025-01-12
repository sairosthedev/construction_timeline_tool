const Project = require('../models/Project');

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { name, startDate, endDate, resources, weatherConditions, previousDelays } = req.body;

    // Validate required fields
    if (!name || !startDate || !endDate || !resources || !weatherConditions) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate dates
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ error: 'End date must be after start date' });
    }

    // Validate resources
    if (resources < 1) {
      return res.status(400).json({ error: 'Resources must be at least 1' });
    }

    // Validate weather conditions
    if (!['Good', 'Fair', 'Poor'].includes(weatherConditions)) {
      return res.status(400).json({ error: 'Invalid weather conditions' });
    }

    // Validate previous delays
    if (previousDelays < 0) {
      return res.status(400).json({ error: 'Previous delays must be a non-negative number' });
    }

    const project = new Project({
      name,
      startDate,
      endDate,
      resources,
      weatherConditions,
      previousDelays: previousDelays || 0,
      userId: req.user.id
    });

    const savedProject = await project.save();
    res.status(201).json({
      success: true,
      data: savedProject
    });

  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const updatedData = req.body;
    const project = await Project.findByIdAndUpdate(projectId, updatedData, { new: true });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};
