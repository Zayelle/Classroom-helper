from server.database.db import db
from sqlalchemy.orm import relationship

class Assignment(db.Model):
    __tablename__ = 'assignments'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    due_date = db.Column(db.Date)

    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'), nullable=False)

    # One assignment can have many submissions
    teacher = db.relationship('Teacher', back_populates='assignments')
    submissions = db.relationship('Submission', back_populates='assignment')

    def __repr__(self):
        return f"<Assignment {self.title}>"
