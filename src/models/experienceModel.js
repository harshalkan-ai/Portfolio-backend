import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, 'Please provide a company name'],
            trim: true,
        },
        position: {
            type: String,
            required: [true, 'Please provide a job position/title'],
            trim: true,
        },
        startDate: {
            type: String,
            required: [true, 'Please provide a start date'],
            trim: true,
        },
        endDate: {
            type: String,
            default: 'Present',
            trim: true,
        },
        current: {
            type: Boolean,
            default: false,
        },
        description: {
            type: [String],
            default: [],
        },
        location: {
            type: String,
            default: '',
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
