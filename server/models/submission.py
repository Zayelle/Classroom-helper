from server.database.db import db
from sqlalchemy.orm import relationship
from server.models.student import Student
from server.models.assignment import Assignment

class Submission(db.Model):
    __tablename__ = 'submissions'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)  # User-submitted work
    grade = db.Column(db.String(10))              # Graded by teacher
    feedback = db.Column(db.Text)                 # Teacher's feedback

    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    assignment_id = db.Column(db.Integer, db.ForeignKey('assignments.id'), nullable=False)

    student = db.relationship('Student', back_populates='submissions')
    assignment = db.relationship('Assignment', back_populates='submissions')
    def __repr__(self):
        return f"<Submission Student:{self.student_id} Assignment:{self.assignment_id}>"
