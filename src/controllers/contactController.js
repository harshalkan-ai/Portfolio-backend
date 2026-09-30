import Message from '../models/messageModel.js';
import { sendEmailNotification } from '../utils/sendEmail.js';

/**
 * @desc    Send a contact message (Save to DB & trigger email notification)
 * @route   POST /api/contact
 * @access  Public
 */
export const sendMessage = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            res.status(400);
            throw new Error('Please provide name, email, and message');
        }

        // 1. Save contact message in DB
        const savedMessage = await Message.create({
            name,
            email,
            subject: subject || '',
            message,
        });

        // 2. Trigger asynchronous email notification (non-blocking for resilience)
        sendEmailNotification({
            name,
            email,
            subject,
            message,
        }).catch((err) => {
            console.error('Email dispatch error:', err);
        });

        res.status(201).json({
            success: true,
            message: 'Message sent successfully! We will get back to you soon.',
            data: savedMessage,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all contact messages
 * @route   GET /api/contact
 * @access  Private (Admin)
 */
export const getMessages = async (req, res, next) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Messages fetched successfully',
            data: messages,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Mark contact message as read
 * @route   PUT /api/contact/:id/read
 * @access  Private (Admin)
 */
export const markMessageRead = async (req, res, next) => {
    try {
        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );

        if (!message) {
            res.status(404);
            throw new Error('Message not found');
        }

        res.status(200).json({
            success: true,
            message: 'Message marked as read',
            data: message,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a contact message
 * @route   DELETE /api/contact/:id
 * @access  Private (Admin)
 */
export const deleteMessage = async (req, res, next) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);

        if (!message) {
            res.status(404);
            throw new Error('Message not found');
        }

        res.status(200).json({
            success: true,
            message: 'Message deleted successfully',
            data: { id: req.params.id },
        });
    } catch (error) {
        next(error);
    }
};
