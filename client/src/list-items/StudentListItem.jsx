import { useState } from 'react';

function StudentListItem({ student, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);

  function handleDelete() {
    fetch(`/api/students/${student.id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) onDelete(student.id);
      })
      .catch(console.error);
  }

  function handleEdit() {
    fetch(`/api/students/${student.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
      .then(res => res.json())
      .then(updated => {
        onUpdate(updated);
        setEditing(false);
      })
      .catch(console.error);
  }

  return (
    <li style={{ marginBottom: '1rem' }}>
      {editing ? (
        <>
          <input value={name} onChange={e => setName(e.target.value)} />
          <input value={email} onChange={e => setEmail(e.target.value)} />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          {student.name} — {student.email}
          <button onClick={() => setEditing(true)} style={{ marginLeft: '1rem' }}>Edit</button>
          <button onClick={handleDelete} style={{ marginLeft: '0.5rem' }}>Delete</button>
        </>
      )}
    </li>
  );
}

export default StudentListItem;
