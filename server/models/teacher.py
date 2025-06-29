from server.database.db import db

class Teacher(db.Model):
    __tablename__ = 'teachers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    # One teacher can have many assignments
    assignments = db.relationship('Assignment', backref='teacher', cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Teacher {self.name}>"
