from app.core.database import db

def save_exam(exam_data):
    return db.exams.insert_one(exam_data).inserted_id

def list_exams():
    return list(db.exams.find({}, {"_id": 0}))
