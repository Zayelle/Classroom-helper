import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation Schema
const schema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  due_date: Yup.date().required('Due date is required'),
  teacher_id: Yup.number().required('Teacher is required'),
});

function AssignmentForm({ teachers = [], onAdd }) {
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  return (
    <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
      <h2>Add New Assignment</h2>

      <Formik
        initialValues={{ title: '', description: '', due_date: '', teacher_id: '' }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          setSubmitting(true);
          setError(null);

          fetch('/api/assignments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          })
            .then(res => {
              if (!res.ok) throw new Error('Failed to create assignment');
              return res.json();
            })
            .then(data => {
              onAdd?.(data);
              resetForm();
            })
            .catch(err => {
              console.error(err);
              setError('❌ Could not add assignment. Please try again.');
            })
            .finally(() => setSubmitting(false));
        }}
      >
        <Form>
          <label htmlFor="title">Title</label>
          <Field name="title" />
          <ErrorMessage name="title" component="div" style={{ color: 'red' }} />

          <label htmlFor="description">Description</label>
          <Field name="description" />
          <ErrorMessage name="description" component="div" style={{ color: 'red' }} />

          <label htmlFor="due_date">Due Date</label>
          <Field name="due_date" type="date" />
          <ErrorMessage name="due_date" component="div" style={{ color: 'red' }} />

          <label htmlFor="teacher_id">Teacher</label>
          <Field name="teacher_id" as="select">
            <option value="">Select</option>
            {teachers.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </Field>
          <ErrorMessage name="teacher_id" component="div" style={{ color: 'red' }} />

          {error && <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}

          <button type="submit" disabled={submitting} style={{ marginTop: '1rem' }}>
            {submitting ? 'Submitting...' : 'Add Assignment'}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default AssignmentForm;

