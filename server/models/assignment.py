from server.database.db import db

class Assignment(db.Model):
    __tablename__ = 'assignments'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    due_date = db.Column(db.Date)

    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'), nullable=False)

    # One assignment can have many submissions
    submissions = db.relationship('Submission', backref='assignment', cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Assignment {self.title}>"
