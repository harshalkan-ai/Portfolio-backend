import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide your name'],
            trim: true,
        },
        title: {
            type: String,
            required: [true, 'Please provide your professional title'],
            trim: true,
        },
        bio: {
            type: String,
            required: [true, 'Please provide your bio'],
        },
        avatar: {
            type: String,
            default: '',
        },
        resumeUrl: {
            type: String,
            default: '',
        },
        socialLinks: {
            github: { type: String, default: '' },
            linkedin: { type: String, default: '' },
            twitter: { type: String, default: '' },
            instagram: { type: String, default: '' },
            youtube: { type: String, default: '' },
        },
        location: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

const About = mongoose.model('About', aboutSchema);

export default About;
