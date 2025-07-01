import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
        <li><Link to="/">🏠 Home</Link></li>
        <li><Link to="/students">👩‍🎓 Students</Link></li>
        <li><Link to="/teachers">👨‍🏫 Teachers</Link></li>
        <li><Link to="/assignments">📝 Assignments</Link></li>
        <li><Link to="/submissions">📄 Submissions</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

