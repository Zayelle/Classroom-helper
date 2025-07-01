import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>📚 Classroom Helper</h1>
      <p>Welcome to the Classroom Helper App — built for teachers and students to manage assignments and submissions effortlessly.</p>

      <div style={{ marginTop: "2rem" }}>
        <h3>Quick Links:</h3>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          <li><Link to="/students">👩‍🎓 Manage Students</Link></li>
          <li><Link to="/teachers">👨‍🏫 Manage Teachers</Link></li>
          <li><Link to="/assignments">📝 Manage Assignments</Link></li>
          <li><Link to="/submissions">📄 View Submissions</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
