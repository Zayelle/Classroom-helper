import { useEffect, useState } from 'react';
import TeacherListItem from './list-items/TeacherListItem';
import TeacherForm from '../forms/TeacherForm';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/teachers')
      .then((res) => res.json())
      .then(setTeachers)
      .catch((err) => {
        console.error(err);
        setError('Failed to load teachers');
      });
  }, []);

  function handleAddOrUpdate(teacher) {
    setTeachers((prev) => {
      const existing = prev.find((t) => t.id === teacher.id);
      if (existing) {
        return prev.map((t) => (t.id === teacher.id ? teacher : t));
      }
      return [...prev, teacher];
    });
    setEditingTeacher(null);
  }

  function handleEdit(teacher) {
    setEditingTeacher(teacher);
  }

  function handleDelete(id) {
    fetch(`/api/teachers/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) throw new Error('Delete failed');
        setTeachers((prev) => prev.filter((t) => t.id !== id));
      })
      .catch((err) => {
        console.error(err);
        setError('Delete failed');
      });
  }

  return (
    <div className="teacher-section">
      <h2>👩‍🏫 Teacher Management</h2>

      {/* Fix: prop name must match what TeacherForm expects */}
      <TeacherForm onAdd={handleAddOrUpdate} teacher={editingTeacher} />

      {error && <p className="error">{error}</p>}

      <ul className="teacher-list">
        {teachers.map((teacher) => (
          <TeacherListItem
            key={teacher.id}
            teacher={teacher}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default TeacherList;
