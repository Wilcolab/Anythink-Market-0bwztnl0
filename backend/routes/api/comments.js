const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { text, author } = req.body;
    const newComment = new Comment({ text, author });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: "Failed to create comment" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text, author } = req.body;
    /**
     * Updates a comment by its ID with the provided text and author.
     * 
     * @param {string} id - The ID of the comment to update.
     * @param {string} text - The new text for the comment.
     * @param {string} author - The new author of the comment.
     * @returns {Promise<Comment|null>} The updated comment document, or null if not found.
     */
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { text, author },
      { new: true }
    );
    res.json(updatedComment);
  } catch (err) {
    res.status(500).json({ error: "Failed to update comment" });
  }
});
