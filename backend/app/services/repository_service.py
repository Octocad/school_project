from app.core.database import db

def save_material(material):
    return db.repository.insert_one(material).inserted_id

def list_materials():
    return list(db.repository.find({}, {"_id": 0}))
