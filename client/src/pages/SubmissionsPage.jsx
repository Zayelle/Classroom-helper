import { useEffect, useState } from 'react';
import SubmissionsList from '../components/SubmissionsList';
import SubmissionForm from '../forms/SubmissionForm';

function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [editingSubmission, setEditingSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load submissions, students, and assignments on mount
  useEffect(() => {
    Promise.all([
      fetch('/api/submissions').then(res => res.json()),
      fetch('/api/students').then(res => res.json()),
      fetch('/api/assignments').then(res => res.json())
    ])
      .then(([subs, studs, assigns]) => {
        setSubmissions(subs);
        setStudents(studs);
        setAssignments(assigns);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('❌ Failed to load data');
        setLoading(false);
      });
  }, []);

  // CREATE or UPDATE
  function handleAddOrUpdate(submission) {
    const exists = submissions.find((s) => s.id === submission.id);
    if (exists) {
      setSubmissions((prev) =>
        prev.map((s) => (s.id === submission.id ? submission : s))
      );
    } else {
      setSubmissions((prev) => [...prev, submission]);
    }
    setEditingSubmission(null);
  }

  // DELETE
  function handleDelete(id) {
    fetch(`/api/submissions/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) throw new Error('Delete failed');
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
      })
      .catch((err) => {
        console.error(err);
        setError('❌ Failed to delete submission');
      });
  }

  if (loading) return <p>Loading submissions...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📄 Submissions</h1>

      <SubmissionForm
        students={students}
        assignments={assignments}
        onAdd={handleAddOrUpdate}
        submission={editingSubmission}
      />

      <SubmissionsList
        submissions={submissions}
        onEdit={setEditingSubmission}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default SubmissionsPage;

