import React, { useState, useEffect } from 'react';
import '../src/App.css'

const App = () => {
  const [notes, setNotes] = useState([]); // Store all notes
  const [filteredNotes, setFilteredNotes] = useState([]); // Store filtered notes for display
  const [newNote, setNewNote] = useState({ title: '', content: '' }); // New note data
  const [editNote, setEditNote] = useState(null); // Note being edited
  const [searchQuery, setSearchQuery] = useState(''); // Search query for filtering

  // Fetch all notes from the backend
  useEffect(() => {
    fetch('http://localhost:8001/api/notes')
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
        setFilteredNotes(data); // Initialize filtered notes with all notes
      })
      .catch((error) => console.error('Error fetching notes:', error));
  }, []);

  // Create a new note
  const handleCreateNote = () => {
    fetch('http://localhost:8001/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((data) => {
        setNotes([...notes, data.note]);
        setFilteredNotes([...notes, data.note]); // Update filtered notes
        setNewNote({ title: '', content: '' });
      })
      .catch((error) => console.error('Error creating note:', error));
  };

  // Update a note
  const handleUpdateNote = () => {
    fetch(`http://localhost:8001/api/notes/${editNote._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editNote),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedNotes = notes.map((note) =>
          note._id === data.note._id ? data.note : note
        );
        setNotes(updatedNotes);
        setFilteredNotes(updatedNotes); // Update filtered notes
        setEditNote(null);
      })
      .catch((error) => console.error('Error updating note:', error));
  };

  // Delete a note
  const handleDeleteNote = (id) => {
    fetch(`http://localhost:8001/api/notes/${id}`, { method: 'DELETE' })
      .then(() => {
        const updatedNotes = notes.filter((note) => note._id !== id);
        setNotes(updatedNotes);
        setFilteredNotes(updatedNotes); // Update filtered notes
      })
      .catch((error) => console.error('Error deleting note:', error));
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter notes by title
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(query)
    );
    setFilteredNotes(filtered);
  };

  return (
    <div className='container'>
      <h1>Notes Management</h1>

      {/* Search Bar */}
      <div className='searchContainer'>
        <h3>Search</h3>
        <input
          type="text"
          placeholder="Search notes by title..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Create Note */}
      <div>
        <h2>Create Note</h2>
        <div className='inputContainer'>
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
        className='textAreaConatiner'
          placeholder="Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <button onClick={handleCreateNote}>Create</button>
        </div>    </div>

      {/* Edit Note */}
      {editNote && (
        <div className='editContainer'>
          <h2>Edit Note</h2>
          <div className='editInputContainer'>
          <input
            type="text"
            value={editNote.title}
            onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
          />
          <textarea
          className='textAreaConatiner'
            value={editNote.content}
            onChange={(e) =>
              setEditNote({ ...editNote, content: e.target.value })
            }
          />
          <button onClick={handleUpdateNote}>Update</button>
          <button onClick={() => setEditNote(null)}>Cancel</button>
        </div>
        </div>
      )}

      {/* List of Notes */}
      <div>
        <h2>All Notes</h2>
        <ul>
          {filteredNotes.map((note) => (
            <li key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => setEditNote(note)}>Edit</button>
              <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
