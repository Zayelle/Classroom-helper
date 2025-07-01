from flask import jsonify, request
from server.models.assignment import Assignment
from server.database.db import db
from datetime import datetime

# GET /api/assignments — List all assignments
def get_assignments():
    assignments = Assignment.query.all()
    return jsonify([
        {
            "id": a.id,
            "title": a.title,
            "description": a.description,
            "due_date": a.due_date.isoformat() if a.due_date else None,
            "teacher_id": a.teacher_id
        } for a in assignments
    ])

# GET /api/assignments/<int:id> — Get single assignment
def get_assignment(id):
    assignment = Assignment.query.get(id)
    if not assignment:
        return jsonify({"error": "Assignment not found"}), 404

    return jsonify({
        "id": assignment.id,
        "title": assignment.title,
        "description": assignment.description,
        "due_date": assignment.due_date.isoformat() if assignment.due_date else None,
        "teacher_id": assignment.teacher_id
    })

# POST /api/assignments — Create new assignment
def create_assignment():
    data = request.get_json()
    title = data.get("title")       
    description = data.get("description")
    due_date = data.get("due_date") 
    teacher_id = data.get("teacher_id")

    if not title or not teacher_id:
        return jsonify({"error": "Title and teacher_id are required"}), 400

     # Optional: validate date format
    if due_date:
        try:
            datetime.datetime.fromisoformat(due_date)
        except ValueError:
            return jsonify({"error": "Invalid due date format. Use YYYY-MM-DD"}), 400
        
    new_assignment = Assignment(
        title=data["title"],
        description=data("description"),
        due_date=datetime.fromisoformat(data["due_date"]) if data.get("due_date") else None,
        teacher_id=data["teacher_id"]
    )

    db.session.add(new_assignment)
    db.session.commit()

    return jsonify({
        "id": new_assignment.id,
        "title": new_assignment.title,
        "description": new_assignment.description,
        "due_date": new_assignment.due_date.isoformat() if new_assignment.due_date else None,
        "teacher_id": new_assignment.teacher_id
    }), 201

# PATCH /api/assignments/<int:id> — Update an assignment
def update_assignment(id):
    assignment = Assignment.query.get(id)
    if not assignment:
        return jsonify({"error": "Assignment not found"}), 404

    data = request.get_json()
    assignment.title = data.get("title", assignment.title)
    assignment.description = data.get("description", assignment.description)

    if data.get("due_date"):
        assignment.due_date = datetime.fromisoformat(data["due_date"])

    db.session.commit()
    return jsonify({"message": "Assignment updated"})

# DELETE /api/assignments/<int:id> — Delete an assignment
def delete_assignment(id):
    assignment = Assignment.query.get(id)
    if not assignment:
        return jsonify({"error": "Assignment not found"}), 404

    db.session.delete(assignment)
    db.session.commit()
    return jsonify({"message": "Assignment deleted"})

