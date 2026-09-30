import Skill from '../models/skillModel.js';

/**
 * @desc    Get all skills
 * @route   GET /api/skills
 * @access  Public
 */
export const getSkills = async (req, res, next) => {
    try {
        const skills = await Skill.find().sort({ category: 1, proficiency: -1 });

        res.status(200).json({
            success: true,
            message: 'Skills fetched successfully',
            data: skills,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create a new skill
 * @route   POST /api/skills
 * @access  Private (Admin)
 */
export const createSkill = async (req, res, next) => {
    try {
        const skill = await Skill.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Skill created successfully',
            data: skill,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update a skill
 * @route   PUT /api/skills/:id
 * @access  Private (Admin)
 */
export const updateSkill = async (req, res, next) => {
    try {
        const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!skill) {
            res.status(404);
            throw new Error('Skill not found');
        }

        res.status(200).json({
            success: true,
            message: 'Skill updated successfully',
            data: skill,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a skill
 * @route   DELETE /api/skills/:id
 * @access  Private (Admin)
 */
export const deleteSkill = async (req, res, next) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);

        if (!skill) {
            res.status(404);
            throw new Error('Skill not found');
        }

        res.status(200).json({
            success: true,
            message: 'Skill deleted successfully',
            data: { id: req.params.id },
        });
    } catch (error) {
        next(error);
    }
};
