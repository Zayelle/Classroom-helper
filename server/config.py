import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL',
        'postgresql://postgres:password@localhost:5432/classroom_helper_db'  # 🔁 change as needed
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
