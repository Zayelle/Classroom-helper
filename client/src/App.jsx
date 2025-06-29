import { useEffect } from 'react'

function App() {
  useEffect(() => {
    fetch('/api/test')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error("Error fetching from backend:", err));
  }, []);

  return (
    <div>
      <h1>Classroom Helper</h1>
      <p>Check the console to see if Flask is connected!</p>
    </div>
  );
}

export default App;

