from flask import Blueprint, jsonify
from server.controllers.teacher_controller import get_teachers,get_teacher, create_teacher
from server.controllers.student_controller import get_students,get_student, create_student
from server.controllers.assignment_controller import get_assignments, get_assignment, create_assignment, update_assignment, delete_assignment
from server.controllers.submission_controller import get_submissions,get_submission, create_submission, update_submission, delete_submission

api = Blueprint('api', __name__)

@api.route('/api/test')
def test():
    return jsonify({"message": "Flask is connected to React!"})

# Teachers
@api.route('/api/teachers', methods=['GET'])
def teachers_index():
    return get_teachers()

@api.route('/api/teachers/<int:id>', methods=['GET'])
def teachers_show(id):
    return get_teacher(id)

@api.route('/api/teachers', methods=['POST'])
def teachers_create():
    return create_teacher()

# Students
@api.route('/api/students', methods=['GET'])
def students_index():
    return get_students()

@api.route('/api/students/<int:id>', methods=['GET'])
def students_show(id):
    return get_student(id)

@api.route('/api/students', methods=['POST'])
def students_create():
    return create_student()

# Assignments
@api.route('/api/assignments', methods=['GET'])
def assignments_index():
    return get_assignments()

@api.route('/api/assignments/<int:id>', methods=['GET'])
def assignments_show(id):
    return get_assignment(id)

@api.route('/api/assignments', methods=['POST'])
def assignments_create():
    return create_assignment()

@api.route('/api/assignments/<int:id>', methods=['PATCH'])
def assignments_update(id):
    return update_assignment(id) 

@api.route('/api/assignments/<int:id>', methods=['DELETE'])
def assignments_delete(id):
    return delete_assignment(id)       


# Submissions
@api.route('/api/submissions', methods=['GET'])
def submissions_index():
    return get_submissions()

@api.route('/api/submissions/<int:id>', methods=['GET'])
def submissions_show(id):
    return get_submission(id)

@api.route('/api/submissions', methods=['POST'])
def submissions_create():
    return create_submission()

@api.route('/api/submissions/<int:id>', methods=['PATCH'])
def submissions_update(id):
    return update_submission(id)                

@api.route('/api/submissions/<int:id>', methods=['DELETE'])
def submissions_delete(id):
    return delete_submission(id)