import { useEffect, useState } from "react";
import StudentForm from "../forms/StudentForm";
import StudentList from "../components/StudentList";

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function handleNewStudent(newStudent) {
    setStudents((prev) => [...prev, newStudent]);
  }

  useEffect(() => {
    fetch("/api/students")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch students");
        return res.json();
      })
      .then(setStudents)
      .catch((err) => {
        console.error(err);
        setError("❌ Error loading students");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>👩‍🎓 Students</h1>

      <StudentForm onStudentAdded={handleNewStudent} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <StudentList students={students} setStudents={setStudents} />
    </div>
  );
}

export default StudentsPage;


