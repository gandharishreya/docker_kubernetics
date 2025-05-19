async function fetchNotes() {
  const res = await fetch('/api/notes');
  const notes = await res.json();
  const list = document.getElementById('notesList');
  list.innerHTML = '';

  notes.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note.text;
    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.className = 'delete-btn';
    btn.onclick = () => deleteNote(note.id);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

async function addNote() {
  const input = document.getElementById('noteInput');
  const text = input.value.trim();
  if (!text) return;

  await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  input.value = '';
  fetchNotes();
}

async function deleteNote(id) {
  await fetch(`/api/notes/${id}`, { method: 'DELETE' });
  fetchNotes();
}

window.onload = fetchNotes;
