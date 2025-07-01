import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormFeedback from '../components/FormFeedback';

// Schema validation with Yup
const studentSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
});

function StudentForm({ onStudentAdded }) {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
      <h2>Add New Student</h2>

      <Formik
        initialValues={{ name: '', email: '' }}
        validationSchema={studentSchema}
        onSubmit={(values, { resetForm }) => {
          setIsSubmitting(true);
          setError(null);

          fetch('/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          })
            .then(res => {
              if (!res.ok) throw new Error('Failed to create student');
              return res.json();
            })
            .then(data => {
              onStudentAdded?.(data); // Optional callback
              resetForm();
            })
            .catch(err => {
              console.error(err);
              setError('❌ Failed to add student. Please try again.');
            })
            .finally(() => setIsSubmitting(false));
        }}
      >
        <Form>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="name">Name</label><br />
            <Field id="name" name="name" placeholder="Jane Doe" />
            <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email">Email</label><br />
            <Field id="email" name="email" placeholder="jane@example.com" />
            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
          </div>

          {error && <FormFeedback message={error} type="error" />}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Add Student'}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default StudentForm;


