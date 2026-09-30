import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a blog title'],
            trim: true,
        },
        slug: {
            type: String,
            required: [true, 'Please provide a slug'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        summary: {
            type: String,
            default: '',
        },
        content: {
            type: String,
            required: [true, 'Please provide blog content'],
        },
        coverImage: {
            type: String,
            default: '',
        },
        tags: {
            type: [String],
            default: [],
        },
        readTime: {
            type: String,
            default: '5 min read',
        },
        published: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
