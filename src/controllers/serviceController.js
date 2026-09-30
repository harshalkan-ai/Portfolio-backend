import Service from '../models/serviceModel.js';

/**
 * @desc    Get all services
 * @route   GET /api/services
 * @access  Public
 */
export const getServices = async (req, res, next) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Services fetched successfully',
            data: services,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create a new service
 * @route   POST /api/services
 * @access  Private (Admin)
 */
export const createService = async (req, res, next) => {
    try {
        const service = await Service.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Service created successfully',
            data: service,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update a service
 * @route   PUT /api/services/:id
 * @access  Private (Admin)
 */
export const updateService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!service) {
            res.status(404);
            throw new Error('Service not found');
        }

        res.status(200).json({
            success: true,
            message: 'Service updated successfully',
            data: service,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a service
 * @route   DELETE /api/services/:id
 * @access  Private (Admin)
 */
export const deleteService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);

        if (!service) {
            res.status(404);
            throw new Error('Service not found');
        }

        res.status(200).json({
            success: true,
            message: 'Service deleted successfully',
            data: { id: req.params.id },
        });
    } catch (error) {
        next(error);
    }
};
