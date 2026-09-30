import About from '../models/aboutModel.js';

/**
 * @desc    Get About info (Public)
 * @route   GET /api/about
 * @access  Public
 */
export const getAbout = async (req, res, next) => {
    try {
        let about = await About.findOne();

        // If no about document exists yet, return default empty structure
        if (!about) {
            about = {
                name: '',
                title: '',
                bio: '',
                avatar: '',
                resumeUrl: '',
                socialLinks: {
                    github: '',
                    linkedin: '',
                    twitter: '',
                    instagram: '',
                    youtube: '',
                },
                location: '',
            };
        }

        res.status(200).json({
            success: true,
            message: 'About information fetched successfully',
            data: about,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update or create About info (Protected)
 * @route   PUT /api/about
 * @access  Private (Admin)
 */
export const updateAbout = async (req, res, next) => {
    try {
        let about = await About.findOne();

        if (about) {
            about = await About.findByIdAndUpdate(about._id, req.body, {
                new: true,
                runValidators: true,
            });
        } else {
            about = await About.create(req.body);
        }

        res.status(200).json({
            success: true,
            message: 'About information updated successfully',
            data: about,
        });
    } catch (error) {
        next(error);
    }
};
