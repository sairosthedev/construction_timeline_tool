import instance from '../utils/axios';

// Get all projects
export const getProjects = async () => {
    try {
        const response = await instance.get('/projects');
        return response.data;
    } catch (err) {
        throw new Error('Failed to fetch projects');
    }
};

// Get a single project by ID
export const getProjectById = async (id) => {
    try {
        const response = await instance.get(`/projects/${id}`);
        return response.data;
    } catch (err) {
        throw new Error('Failed to fetch project');
    }
};

// Create a new project
export const createProject = async (projectData) => {
    try {
        const response = await instance.post('/projects', projectData);
        return response.data;
    } catch (err) {
        throw new Error('Failed to create project');
    }
};

// Update an existing project
export const updateProject = async (id, projectData) => {
    try {
        const response = await instance.put(`/projects/${id}`, projectData);
        return response.data;
    } catch (err) {
        throw new Error('Failed to update project');
    }
};

// Delete a project
export const deleteProject = async (id) => {
    try {
        const response = await instance.delete(`/projects/${id}`);
        return response.data;
    } catch (err) {
        throw new Error('Failed to delete project');
    }
};

// Predict project delay
export const predictDelay = async (predictionData) => {
    try {
        const response = await instance.post('/api/predict', predictionData);
        return response.data;
    } catch (err) {
        throw new Error('Failed to fetch prediction');
    }
};

// Search projects
export const searchProjects = async (searchTerm) => {
    try {
        const response = await instance.get(`/projects/search?q=${searchTerm}`);
        return response.data;
    } catch (err) {
        throw new Error('Failed to search projects');
    }
};

// Update project status
export const updateProjectStatus = async (id, status) => {
    try {
        const response = await instance.patch(`/projects/${id}/status`, { status });
        return response.data;
    } catch (err) {
        throw new Error('Failed to update project status');
    }
};

// Bulk delete projects
export const bulkDeleteProjects = async (projectIds) => {
    try {
        const response = await instance.delete('/projects/bulk', { 
            data: { projectIds } 
        });
        return response.data;
    } catch (err) {
        throw new Error('Failed to delete projects');
    }
};