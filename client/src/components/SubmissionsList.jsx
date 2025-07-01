import { useEffect, useState } from 'react';
import SubmissionListItem from '../list-items/SubmissionListItem';

function SubmissionsList() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/submissions')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch submissions');
        return res.json();
      })
      .then(data => setSubmissions(data))
      .catch(err => {
        console.error("Error fetching submissions:", err);
        setError('❌ Failed to load submissions');
      })
      .finally(() => setLoading(false));
  }, []);

  function handleEdit(updatedSubmission) {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === updatedSubmission.id ? updatedSubmission : sub
      )
    );
  }

  function handleDelete(id) {
    setSubmissions(prev => prev.filter(sub => sub.id !== id));
  }

  if (loading) return <p>Loading submissions...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!submissions.length) return <p>No submissions found.</p>;

  return (
    <div>
      <h2>📄 Student Submissions</h2>
      <ul style={{ padding: 0 }}>
        {submissions.map(sub => (
          <SubmissionListItem
            key={sub.id}
            submission={sub}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default SubmissionsList;

