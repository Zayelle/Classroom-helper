from flask import jsonify, request
from server.models.student import Student
from server.database.db import db

# GET /api/students — Get all students
def get_students():
    students = Student.query.all()
    return jsonify([
        {"id": s.id, "name": s.name, "email": s.email}
          for s in students
          ])

# GET /api/students/<int:id> — Get single student
def get_student(id):
    student = Student.query.get(id)
    if not student:
        return jsonify({"error": "Student not found"}), 404

    return jsonify({
        "id": student.id,
        "name": student.name,
        "email": student.email
    })

# POST /api/students — Create a new student
def create_student():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")

    if not name or not email:
        return jsonify({"error": "Name and email are required"}), 400
    
    if "@" not in email or "." not in email:
        return jsonify({"error": "Invalid email format"}), 400
    
    new_student = Student(
        name=data["name"],
        email=data["email"]
    )
    db.session.add(new_student)
    db.session.commit()
    return jsonify({
        "id": new_student.id,
        "name": new_student.name,
        "email": new_student.email
        }), 201
