from app.core.database import db
from bson.objectid import ObjectId

def save_material(material):
    return db.exams.insert_one(material).inserted_id

def list_materials():
    exams = []
    for exam in db.exams.find({}):
        exam["_id"] = str(exam["_id"])  # Convert ObjectId to string
        exams.append(exam)
    return exams
