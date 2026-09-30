import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a project title'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a project description'],
        },
        techStack: {
            type: [String],
            default: [],
        },
        imageUrl: {
            type: String,
            default: '',
        },
        githubUrl: {
            type: String,
            default: '',
        },
        liveUrl: {
            type: String,
            default: '',
        },
        featured: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
