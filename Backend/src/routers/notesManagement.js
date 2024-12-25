const express = require('express');
const Note = require('../mongoose/models/note'); // Import Note model
const router = express.Router();

// GET: Fetch all notes
router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Create a new note
router.post('/notes', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: 'Note created', note: newNote });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET: Fetch a single note by ID
router.get('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Update a note by ID
router.put('/notes/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );
    if (!updatedNote) return res.status(404).json({ error: 'Note not found' });
    res.status(200).json({ message: 'Note updated', note: updatedNote });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE: Delete a note by ID
router.delete('/notes/:id', async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ error: 'Note not found' });
    res.status(200).json({ message: 'Note deleted', note: deletedNote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
