import { useEffect, useState } from 'react';
import TeacherForm from '../forms/TeacherForm';
import TeacherListItem from '../list-items/TeacherListItem';

function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/teachers')
      .then(res => res.json())
      .then(data => {
        setTeachers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching teachers:", err);
        setLoading(false);
      });
  }, []);

  function handleAddTeacher(newTeacher) {
    setTeachers(prev => [...prev, newTeacher]);
  }

  if (loading) return <p>Loading teachers...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>👨‍🏫 Teachers</h1>

      <TeacherForm onAdd={handleAddTeacher} />

      {teachers.length === 0 ? (
        <p>No teachers found.</p>
      ) : (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {teachers.map((teacher) => (
            <TeacherListItem
              key={teacher.id}
              teacher={teacher}
              onDelete={(id) =>
                setTeachers((prev) => prev.filter((t) => t.id !== id))
              }
              onUpdate={(updated) =>
                setTeachers((prev) =>
                  prev.map((t) => (t.id === updated.id ? updated : t))
                )
              }
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TeachersPage;


