import StudentListItem from '../list-items/StudentListItem';

function StudentList({ students, setStudents }) {
  function handleDelete(id) {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }

  function handleUpdate(updatedStudent) {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
  }

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>👩‍🎓 Student List</h2>
      {students.length === 0 ? (
        <p>No students yet.</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {students.map((student) => (
            <StudentListItem
              key={student.id}
              student={student}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentList;


