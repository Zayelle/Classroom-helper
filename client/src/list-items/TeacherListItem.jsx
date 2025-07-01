import { useState } from 'react';

function TeacherListItem({ teacher, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(teacher.name);
  const [email, setEmail] = useState(teacher.email);

  function handleDelete() {
    fetch(`/api/teachers/${teacher.id}`, { method: 'DELETE' })
      .then((res) => {
        if (res.ok) onDelete(teacher.id);
      })
      .catch(console.error);
  }

  function handleEdit() {
    fetch(`/api/teachers/${teacher.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => res.json())
      .then((updated) => {
        onUpdate(updated);
        setEditing(false);
      })
      .catch(console.error);
  }

  return (
    <li style={{ marginBottom: '1rem' }}>
      {editing ? (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          {teacher.name} — {teacher.email}
          <button onClick={() => setEditing(true)} style={{ marginLeft: '1rem' }}>Edit</button>
          <button onClick={handleDelete} style={{ marginLeft: '0.5rem' }}>Delete</button>
        </>
      )}
    </li>
  );
}

export default TeacherListItem;
