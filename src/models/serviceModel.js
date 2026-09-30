import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a service title'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a service description'],
        },
        icon: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

const Service = mongoose.model('Service', serviceSchema);

export default Service;
