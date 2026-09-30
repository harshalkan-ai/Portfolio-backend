import Blog from '../models/blogModel.js';

// Helper function to slugify string
const generateSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-'); // Replace multiple - with single -
};

/**
 * @desc    Get all blogs
 * @route   GET /api/blogs
 * @access  Public
 */
export const getBlogs = async (req, res, next) => {
    try {
        const query = req.query.all === 'true' ? {} : { published: true };
        const blogs = await Blog.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Blogs fetched successfully',
            data: blogs,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single blog by Slug
 * @route   GET /api/blogs/:slug
 * @access  Public
 */
export const getBlogBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const blog = await Blog.findOne({ slug });

        if (!blog) {
            res.status(404);
            throw new Error('Blog post not found');
        }

        res.status(200).json({
            success: true,
            message: 'Blog post fetched successfully',
            data: blog,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Create a new blog post
 * @route   POST /api/blogs
 * @access  Private (Admin)
 */
export const createBlog = async (req, res, next) => {
    try {
        let { title, slug, summary, content, coverImage, tags, readTime, published } = req.body;

        if (!slug && title) {
            slug = generateSlug(title);
        }

        const blog = await Blog.create({
            title,
            slug,
            summary,
            content,
            coverImage,
            tags,
            readTime,
            published,
        });

        res.status(201).json({
            success: true,
            message: 'Blog post created successfully',
            data: blog,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update a blog post
 * @route   PUT /api/blogs/:id
 * @access  Private (Admin)
 */
export const updateBlog = async (req, res, next) => {
    try {
        const { id } = req.params;

        // If title changed and slug not provided, update slug if desired
        if (req.body.title && !req.body.slug) {
            req.body.slug = generateSlug(req.body.title);
        }

        const blog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!blog) {
            res.status(404);
            throw new Error('Blog post not found');
        }

        res.status(200).json({
            success: true,
            message: 'Blog post updated successfully',
            data: blog,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a blog post
 * @route   DELETE /api/blogs/:id
 * @access  Private (Admin)
 */
export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            res.status(404);
            throw new Error('Blog post not found');
        }

        res.status(200).json({
            success: true,
            message: 'Blog post deleted successfully',
            data: { id: req.params.id },
        });
    } catch (error) {
        next(error);
    }
};
