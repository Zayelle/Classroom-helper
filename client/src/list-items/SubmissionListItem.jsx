import { useState } from 'react';

function SubmissionListItem({ submission, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(submission.content);
  const [grade, setGrade] = useState(submission.grade || '');
  const [feedback, setFeedback] = useState(submission.feedback || '');
  const [saving, setSaving] = useState(false);

  function handleDelete() {
    fetch(`/api/submissions/${submission.id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete');
        onDelete(submission.id);
      })
      .catch(console.error);
  }

  function handleSave() {
    setSaving(true);
    fetch(`/api/submissions/${submission.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, grade, feedback }),
    })
      .then(res => res.json())
      .then(updated => {
        onEdit(updated);
        setEditing(false);
      })
      .catch(console.error)
      .finally(() => setSaving(false));
  }

  return (
    <li
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem',
        backgroundColor: '#f9f9f9',
        listStyle: 'none',
      }}
    >
      {editing ? (
        <>
          <p><strong>🧑 Student:</strong> {submission.student_name || `ID ${submission.student_id}`}</p>
          <p><strong>📘 Assignment:</strong> {submission.assignment_title || `ID ${submission.assignment_id}`}</p>

          <label>
            <strong>📝 Content:</strong><br />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              style={{ width: '100%' }}
            />
          </label>

          <label>
            <strong>✅ Grade:</strong><br />
            <input
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              style={{ width: '100%' }}
            />
          </label>

          <label>
            <strong>💬 Feedback:</strong><br />
            <input
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              style={{ width: '100%' }}
            />
          </label>

          <button onClick={handleSave} disabled={saving} style={{ marginTop: '0.5rem' }}>
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button onClick={() => setEditing(false)} style={{ marginLeft: '0.5rem' }}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <p><strong>🧑 Student:</strong> {submission.student_name || `ID ${submission.student_id}`}</p>
          <p><strong>📘 Assignment:</strong> {submission.assignment_title || `ID ${submission.assignment_id}`}</p>
          <p><strong>📝 Content:</strong> {submission.content}</p>
          <p><strong>✅ Grade:</strong> {submission.grade || 'Not graded'}</p>
          <p><strong>💬 Feedback:</strong> {submission.feedback || 'No feedback yet'}</p>

          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete} style={{ marginLeft: '0.5rem' }}>
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default SubmissionListItem;
