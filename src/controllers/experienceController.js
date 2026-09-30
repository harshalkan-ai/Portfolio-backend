import Experience from '../models/experienceModel.js';

/**
 * @desc    Get all experiences
 * @route   GET /api/experience
 * @access  Public
 */
export const getExperiences = async (req, res, next) => {
    try {
        const experiences = await Experience.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Experiences fetched successfully',
            data: experiences,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create a new experience entry
 * @route   POST /api/experience
 * @access  Private (Admin)
 */
export const createExperience = async (req, res, next) => {
    try {
        const experience = await Experience.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Experience entry created successfully',
            data: experience,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update an experience entry
 * @route   PUT /api/experience/:id
 * @access  Private (Admin)
 */
export const updateExperience = async (req, res, next) => {
    try {
        const experience = await Experience.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!experience) {
            res.status(404);
            throw new Error('Experience entry not found');
        }

        res.status(200).json({
            success: true,
            message: 'Experience entry updated successfully',
            data: experience,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete an experience entry
 * @route   DELETE /api/experience/:id
 * @access  Private (Admin)
 */
export const deleteExperience = async (req, res, next) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);

        if (!experience) {
            res.status(404);
            throw new Error('Experience entry not found');
        }

        res.status(200).json({
            success: true,
            message: 'Experience entry deleted successfully',
            data: { id: req.params.id },
        });
    } catch (error) {
        next(error);
    }
};
