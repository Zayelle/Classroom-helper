from flask import jsonify, request
from server.models.submission import Submission
from server.database.db import db

# GET /api/submissions — Get all submissions
def get_submissions():
    submissions = Submission.query.all()
    return jsonify([
        {
            "id": s.id,
            "content": s.content,
            "grade": s.grade,
            "feedback": s.feedback,
            "student_id": s.student_id,
            "assignment_id": s.assignment_id
        } for s in submissions
    ])

# GET /api/submissions/<int:id> — Get single submission
def get_submission(id):
    submission = Submission.query.get(id)
    if not submission:
        return jsonify({"error": "Submission not found"}), 404

    return jsonify({
        "id": submission.id,
        "content": submission.content,
        "grade": submission.grade,
        "feedback": submission.feedback,
        "student_id": submission.student_id,
        "assignment_id": submission.assignment_id
    })

# POST /api/submissions — Create a new submission
def create_submission():
    data = request.get_json()   
    content = data.get("content")
    grade = data.get("grade")
    feedback = data.get("feedback")
    student_id = data.get("student_id")
    assignment_id = data.get("assignment_id")

    if not content or not student_id or not assignment_id:
        return jsonify({"error": "Content, student_id, and assignment_id are required"}), 400
    
    if grade is not None:
        try:
            grade = float(grade)
        except ValueError:
            return jsonify({"error": "Grade must be a number"}), 400
        
    new_submission = Submission(
        content=content,
        grade=grade,
        feedback=feedback,
        student_id=student_id,
        assignment_id=assignment_id
    )
    db.session.add(new_submission)
    db.session.commit()
    return jsonify({
        "id": new_submission.id,
        "content": new_submission.content,
        "grade": new_submission.grade,
        "feedback": new_submission.feedback,
        "student_id": new_submission.student_id,
        "assignment_id": new_submission.assignment_id
        }), 201

# PATCH /api/submissions/<int:id> — Update a submission
def update_submission(id):
    submission = Submission.query.get(id)
    if not submission:
        return jsonify({"error": "Submission not found"}), 404

    data = request.get_json()
    if "grade" in data:
        try:
            submission.grade = float(data["grade"])
        except ValueError:
            return jsonify({"error": "Grade must be a number"}), 400

    submission.content = data.get("content", submission.content)
    submission.grade = data.get("grade", submission.grade)
    submission.feedback = data.get("feedback", submission.feedback)
    
    db.session.commit()
    return jsonify({"message": "Submission updated"})

# DELETE /api/submissions/<int:id> — Delete a submission
def delete_submission(id):
    submission = Submission.query.get(id)
    if not submission:
        return jsonify({"error": "Submission not found"}), 404

    db.session.delete(submission)
    db.session.commit()
    
    return jsonify({"message": "Submission deleted successfully"}), 204