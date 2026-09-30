import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a skill name'],
            trim: true,
        },
        category: {
            type: String,
            required: [true, 'Please specify a category'],
            enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other'],
            default: 'Frontend',
        },
        proficiency: {
            type: Number,
            min: [1, 'Proficiency must be at least 1'],
            max: [100, 'Proficiency cannot exceed 100'],
            default: 80,
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

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
