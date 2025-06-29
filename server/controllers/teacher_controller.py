from flask import jsonify, request
from server.models.teacher import Teacher
from server.database.db import db

# GET /api/teachers — Get all teachers
def get_teachers():
    teachers = Teacher.query.all()
    return jsonify([
        {"id": t.id, 
         "name": t.name, 
         "email": t.email} for t in teachers
    ])

# GET /api/teachers/<int:id> — Get single teacher
def get_teacher(id):
    teacher = Teacher.query.get(id)
    if not teacher:
        return jsonify({"error": "Teacher not found"}), 404

    return jsonify({
        "id": teacher.id,
        "name": teacher.name,
        "email": teacher.email
    })

# POST /api/teachers — Create a new teacher
def create_teacher():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")

    if not name or not email:
        return jsonify({"error": "Name and email are required"}), 400
    if "@" not in email or "." not in email:
        return jsonify({"error": "Invalid email format"}), 400
    
    new_teacher = Teacher(
        name=data["name"],
        email=data["email"]
    )
    db.session.add(new_teacher)
    db.session.commit()

    return jsonify({
        "id": new_teacher.id,
        "name": new_teacher.name,
        "email": new_teacher.email
        }), 201
