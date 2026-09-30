import Project from '../models/projectModel.js';

/**
 * @desc    Get all projects
 * @route   GET /api/projects
 * @access  Public
 */
export const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find().sort({ order: 1, createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Projects fetched successfully',
            data: projects,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single project by ID
 * @route   GET /api/projects/:id
 * @access  Public
 */
export const getProjectById = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            res.status(404);
            throw new Error('Project not found');
        }

        res.status(200).json({
            success: true,
            message: 'Project fetched successfully',
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create a new project
 * @route   POST /api/projects
 * @access  Private (Admin)
 */
export const createProject = async (req, res, next) => {
    try {
        const project = await Project.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update an existing project
 * @route   PUT /api/projects/:id
 * @access  Private (Admin)
 */
export const updateProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!project) {
            res.status(404);
            throw new Error('Project not found');
        }

        res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a project
 * @route   DELETE /api/projects/:id
 * @access  Private (Admin)
 */
export const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            res.status(404);
            throw new Error('Project not found');
        }

        res.status(200).json({
            success: true,
            message: 'Project deleted successfully',
            data: { id: req.params.id },
        });
    } catch (error) {
        next(error);
    }
};
