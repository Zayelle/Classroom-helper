import { useEffect, useState } from 'react';
import AssignmentForm from '../forms/AssignmentForm';
import AssignmentListItem from '../list-items/AssignmentListItem';

function AssignmentPage() {
  const [assignments, setAssignments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch assignments
    fetch('/api/assignments')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch assignments');
        return res.json();
      })
      .then(setAssignments)
      .catch((err) => {
        console.error(err);
        setError('❌ Error loading assignments');
      });

    // Fetch teachers for dropdown
    fetch('/api/teachers')
      .then((res) => res.json())
      .then(setTeachers)
      .catch((err) => {
        console.error('Failed to fetch teachers', err);
      })
      .finally(() => setLoading(false));
  }, []);

  function handleAdd(newAssignment) {
    setAssignments((prev) => [...prev, newAssignment]);
  }

  function handleEdit(updated) {
    setAssignments((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
  }

  function handleDelete(id) {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📝 Assignments</h1>

      <AssignmentForm teachers={teachers} onAdd={handleAdd} />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {assignments.map((assignment) => (
          <AssignmentListItem
            key={assignment.id}
            assignment={assignment}
            onEdit={handleEdit}
            onDelete={handleDelete}
            teacherName={
              teachers.find(t => t.id === assignment.teacher_id)?.name || 'Unknown'}   
          />
        ))}
      </ul>
    </div>
  );
}

export default AssignmentPage;

