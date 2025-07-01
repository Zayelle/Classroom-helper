function FormFeedback({ error, success }) {
  return (
    <div style={{ marginTop: '0.5rem' }}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </div>
  );
}

export default FormFeedback;
