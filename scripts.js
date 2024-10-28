// Show or hide sections based on sidebar navigation
document.getElementById('viewNotes').addEventListener('click', function() {
    document.getElementById('addNoteSection').style.display = 'none';
    document.getElementById('notesListSection').style.display = 'block';
    document.getElementById('noteDetailSection').style.display = 'none';
    displayNotes();
});

document.getElementById('addNoteView').addEventListener('click', function() {
    document.getElementById('addNoteSection').style.display = 'block';
    document.getElementById('notesListSection').style.display = 'none';
    document.getElementById('noteDetailSection').style.display = 'none';
});

// Add event listeners to save notes
document.getElementById('noteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    saveNote();
});

document.getElementById('addPinnedNote').addEventListener('click', function() {
    saveNote(true);
});

// Function to save a note to local storage with a date
function saveNote(isPinned = false) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const note = document.getElementById('note').value;
    const date = new Date().toLocaleDateString();

    if (title && author && note) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push({ title, author, note, isPinned, date });
        localStorage.setItem('notes', JSON.stringify(notes));

        document.getElementById('noteForm').reset();
        alert(isPinned ? 'Pinned Note Added!' : 'Note Added!');
    }
}

// Function to display notes list with dates and delete button
function displayNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach((note, index) => {
        const noteItem = document.createElement('div');
        noteItem.classList.add('note-item');
        noteItem.innerHTML = `
            <h3 onclick="showNoteDetail(${index})">${note.title} ${note.isPinned ? '📌' : ''}</h3>
            <p><strong>Date:</strong> ${note.date}</p>
            <button onclick="deleteNote(${index})" class="delete-btn">Delete</button>
            <hr>
        `;
        notesList.appendChild(noteItem);
    });
}

// Function to show detailed view of a note
function showNoteDetail(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes[index];

    if (note) {
        document.getElementById('noteTitle').innerText = note.title;
        document.getElementById('noteDate').innerText = note.date;
        document.getElementById('noteAuthor').innerText = note.author;
        document.getElementById('noteContent').innerText = note.note;

        document.getElementById('addNoteSection').style.display = 'none';
        document.getElementById('notesListSection').style.display = 'none';
        document.getElementById('noteDetailSection').style.display = 'block';
    }
}

// Function to delete a note from local storage
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);  // Remove the selected note
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();  // Refresh the notes list
}

// Function to go back to the notes list from detailed view
document.getElementById('backToList').addEventListener('click', function() {
    document.getElementById('noteDetailSection').style.display = 'none';
    document.getElementById('notesListSection').style.display = 'block';
});

// Function to filter notes by search term
document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const notes = document.querySelectorAll('.note-item');

    notes.forEach(note => {
        const title = note.querySelector('h3').innerText.toLowerCase();
        if (title.includes(searchTerm)) {
            note.style.display = 'block';
        } else {
            note.style.display = 'none';
        }
    });
});
