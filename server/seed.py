from server.app import create_app
from server.database.db import db
from server.models.teacher import Teacher
from server.models.student import Student
from server.models.assignment import Assignment
from server.models.submission import Submission
from datetime import date

app = create_app()

with app.app_context():
    print("🌱 Seeding database...")

    # Clear existing data
    Submission.query.delete()
    Assignment.query.delete()
    Student.query.delete()
    Teacher.query.delete()

    # ➕ Add teachers
    teacher1 = Teacher(name="Ms. Alice", email="alice@example.com")
    teacher2 = Teacher(name="Mr. Bob", email="bob@example.com")

    db.session.add_all([teacher1, teacher2])
    db.session.commit()

    # ➕ Add students
    student1 = Student(name="Jane Doe", email="jane@example.com")
    student2 = Student(name="John Smith", email="john@example.com")
    student3 = Student(name="Mary Johnson", email="mary@example.com")

    db.session.add_all([student1, student2, student3])
    db.session.commit()

    # ➕ Add assignments
    assignment1 = Assignment(
        title="Math Homework 1",
        description="Solve problems 1-10 on page 42.",
        due_date=date(2025, 7, 1),
        teacher_id=teacher1.id
    )
    assignment2 = Assignment(
        title="History Essay",
        description="Write an essay about the French Revolution.",
        due_date=date(2025, 7, 3),
        teacher_id=teacher2.id
    )

    db.session.add_all([assignment1, assignment2])
    db.session.commit()

    # ➕ Add submissions (many-to-many with extra data)
    submission1 = Submission(
        content="Here are my math answers...",
        grade="A",
        feedback="Great work!",
        student_id=student1.id,
        assignment_id=assignment1.id
    )
    submission2 = Submission(
        content="Math homework completed.",
        grade="B+",
        feedback="Watch your calculation on #4.",
        student_id=student2.id,
        assignment_id=assignment1.id
    )
    submission3 = Submission(
        content="Essay about the French Revolution...",
        grade=None,
        feedback=None,
        student_id=student1.id,
        assignment_id=assignment2.id
    )

    db.session.add_all([submission1, submission2, submission3])
    db.session.commit()

    print("✅ Done seeding!")
