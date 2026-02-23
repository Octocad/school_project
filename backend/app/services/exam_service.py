from app.core.database import db
from bson.objectid import ObjectId

def save_exam(exam_data):
    return db.exams.insert_one(exam_data).inserted_id

def list_exams():
    return list(db.exams.find({}, {"_id": 0}))

def get_exam_by_id(exam_id: str):
    """Retrieve a single exam by its ID"""
    try:
        exam = db.exams.find_one({"_id": ObjectId(exam_id)})
        if exam:
            exam["_id"] = str(exam["_id"])  # Convert ObjectId to string
        return exam
    except Exception as e:
        print(f"Error retrieving exam: {e}")
        return None
