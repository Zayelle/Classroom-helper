from server.database.db import db

class Student(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    # One student can have many submissions
    submissions = db.relationship('Submission', backref='student', cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Student {self.name}>"
