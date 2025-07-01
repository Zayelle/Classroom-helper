from flask import Flask
from flask_migrate import Migrate
from server.routes.api import api
from server.database.db import db
from server.config import Config
from flask_cors import CORS
from dotenv import load_dotenv
import os

# ✅ Load environment variables before anything else
load_dotenv()

migrate = Migrate()

def create_app():
    app = Flask(__name__)

    # ✅ Load config (which may include os.getenv inside Config)
    app.config.from_object(Config)

    # ✅ Enable CORS for all routes
    CORS(app)

    # ✅ Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # ✅ Register blueprints
    app.register_blueprint(api)

    return app




