import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  content: Yup.string().required('Content is required'),
  grade: Yup.string(),
  feedback: Yup.string(),
  student_id: Yup.number().required('Student is required'),
  assignment_id: Yup.number().required('Assignment is required'),
});

function SubmissionForm({ students = [], assignments = [], onAdd, submission }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const isEditing = !!submission;

  const initialValues = submission
    ? {
        content: submission.content || '',
        grade: submission.grade || '',
        feedback: submission.feedback || '',
        student_id: submission.student_id || '',
        assignment_id: submission.assignment_id || '',
      }
    : {
        content: '',
        grade: '',
        feedback: '',
        student_id: '',
        assignment_id: '',
      };

  return (
    <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
      <h2>{isEditing ? 'Edit Submission' : 'Submit Assignment'}</h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          setSubmitting(true);
          setError(null);

          const url = isEditing
            ? `/api/submissions/${submission.id}`
            : '/api/submissions';

          const method = isEditing ? 'PATCH' : 'POST';

          fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          })
            .then((res) => {
              if (!res.ok) throw new Error('Failed to submit');
              return res.json();
            })
            .then((data) => {
              onAdd?.(data);
              if (!isEditing) resetForm();
            })
            .catch((err) => {
              console.error(err);
              setError('❌ Could not submit. Please try again.');
            })
            .finally(() => setSubmitting(false));
        }}
      >
        <Form>
          <label htmlFor="content">Content</label>
          <Field name="content" as="textarea" />
          <ErrorMessage name="content" component="div" style={{ color: 'red' }} />

          <label htmlFor="grade">Grade</label>
          <Field name="grade" placeholder="Optional (e.g. A+)" />

          <label htmlFor="feedback">Feedback</label>
          <Field name="feedback" placeholder="Optional comments" />

          <label htmlFor="student_id">Student</label>
          <Field name="student_id" as="select" disabled={isEditing}>
            <option value="">Select</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Field>
          <ErrorMessage name="student_id" component="div" style={{ color: 'red' }} />

          <label htmlFor="assignment_id">Assignment</label>
          <Field name="assignment_id" as="select" disabled={isEditing}>
            <option value="">Select</option>
            {assignments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title}
              </option>
            ))}
          </Field>
          <ErrorMessage name="assignment_id" component="div" style={{ color: 'red' }} />

          {error && (
            <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>
          )}

          <button type="submit" disabled={submitting} style={{ marginTop: '1rem' }}>
            {submitting ? 'Submitting...' : isEditing ? 'Update Submission' : 'Submit Work'}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default SubmissionForm;


