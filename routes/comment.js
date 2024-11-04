const express = require('express');
const Comment = require('../models/comment');
const router = express.Router();

// Create a new comment
router.post('/add-new-comment', async (req, res) => {
    try {
        const { projectId, userId, content } = req.body;
        const newComment = new Comment({ projectId, userId, content });
        await newComment.save();
        res.status(201).json({ success: true, message: 'Comment created successfully', comment: newComment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all comments for a specific project
router.get('/project/:projectId', async (req, res) => {
    try {
        const comments = await Comment.find({ projectId: req.params.projectId });
        res.status(200).json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update a comment by ID
router.put('/update-comment/:id', async (req, res) => {
    try {
        const { content } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { content },
            { new: true, runValidators: true }
        );
        if (!updatedComment) return res.status(404).json({ success: false, message: 'Comment not found' });
        res.status(200).json({ success: true, message: 'Comment updated successfully', comment: updatedComment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete a comment by ID
router.delete('/delete-comment/:id', async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) return res.status(404).json({ success: false, message: 'Comment not found' });
        res.status(200).json({ success: true, message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
