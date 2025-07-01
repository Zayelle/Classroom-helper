import { useState } from 'react';

function AssignmentListItem({ assignment,teacherName, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(assignment.title);
  const [description, setDescription] = useState(assignment.description);

  function handleDelete() {
    fetch(`/api/assignments/${assignment.id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) onDelete(assignment.id);
        else throw new Error('Failed to delete assignment');
      })
      .catch(console.error);
  }

  function handleSave() {
    fetch(`/api/assignments/${assignment.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    })
      .then(res => res.json())
      .then(updated => {
        onEdit(updated);
        setEditing(false);
      })
      .catch(console.error);
  }

  return (
    <li style={{ marginBottom: '1rem' }}>
      {editing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <strong>{assignment.title}</strong> — {assignment.description}
            🧑‍🏫 <em>{teacherName}</em>         
          <button onClick={() => setEditing(true)} style={{ marginLeft: '1rem' }}>Edit</button>
          <button onClick={handleDelete} style={{ marginLeft: '0.5rem' }}>Delete</button>
        </>
      )}
    </li>
  );
}

export default AssignmentListItem;
