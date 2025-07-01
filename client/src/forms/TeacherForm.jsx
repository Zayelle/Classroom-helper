import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema with Yup
const schema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

function TeacherForm({ onAdd }) {
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  return (
    <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
      <h2>Add New Teacher</h2>

      <Formik
        initialValues={{ name: '', email: '' }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          setSubmitting(true);
          setError(null);

          fetch('/api/teachers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          })
            .then(res => {
              if (!res.ok) throw new Error('Failed to add teacher');
              return res.json();
            })
            .then(data => {
              onAdd?.(data); // Optional callback if passed
              resetForm();
            })
            .catch(err => {
              console.error(err);
              setError('❌ Could not add teacher. Try again.');
            })
            .finally(() => setSubmitting(false));
        }}
      >
        <Form>
          <label htmlFor="name">Name</label>
          <Field name="name" placeholder="Alice Smith" />
          <ErrorMessage name="name" component="div" style={{ color: 'red' }} />

          <label htmlFor="email">Email</label>
          <Field name="email" placeholder="alice@example.com" />
          <ErrorMessage name="email" component="div" style={{ color: 'red' }} />

          {error && <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}

          <button type="submit" disabled={submitting} style={{ marginTop: '1rem' }}>
            {submitting ? 'Submitting...' : 'Add Teacher'}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default TeacherForm;


