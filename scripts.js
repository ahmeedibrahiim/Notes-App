document.addEventListener('DOMContentLoaded', loadNotes);

// Load notes from localStorage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const pinnedNotesList = document.getElementById('pinned-notes-list');
    const notesList = document.getElementById('notes-list');

    // Clear existing list
    pinnedNotesList.innerHTML = '';
    notesList.innerHTML = '';

    notes.forEach((note, index) => {
        const noteItem = document.createElement('li');
        noteItem.innerHTML = `
            <a href="#" onclick="showNoteDetails(${index})">
                <h3>${note.title}</h3>
                <p>${note.author}</p>
                <p>${note.date}</p>
            </a>
            <button onclick="deleteNote(${index})">Delete</button>
        `;

        // Check if note is pinned and add to pinned list
        if (note.pinned) {
            pinnedNotesList.appendChild(noteItem);
        } else {
            notesList.appendChild(noteItem);
        }
    });
}

// Show note details when clicked
function showNoteDetails(index) {
    const notes = JSON.parse(localStorage.getItem('notes'));
    const note = notes[index];
    const noteDetails = document.getElementById('note-details');

    noteDetails.innerHTML = `
        <h2>${note.title}</h2>
        <p><strong>${note.author}</strong></p>
        <p>${note.date}</p>
        <p>${note.content}</p>
    `;
}

// Delete note
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes'));
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}

// Add note form submission
document.getElementById('add-note-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('note').value;
    const pinned = document.getElementById('pin-note').checked;
    const date = new Date().toLocaleDateString();

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push({ title, author, content, date, pinned });
    localStorage.setItem('notes', JSON.stringify(notes));

    loadNotes();
    closeForm();
});

// Open the Add Note form
document.getElementById('add-note-btn').addEventListener('click', function() {
    document.getElementById('add-note-overlay').style.display = 'flex';
});

// Close the Add Note form
document.getElementById('cancel-btn').addEventListener('click', closeForm);

function closeForm() {
    document.getElementById('add-note-overlay').style.display = 'none';
    document.getElementById('add-note-form').reset(); // Reset form fields
}

// Load the notes when the page is loaded
loadNotes();