from flask import Flask, send_from_directory
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
    app = Flask(__name__, static_folder='static',)

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

# ✅ Create app instance for gunicorn + Render
app = create_app()

# ✅ Serve React frontend
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    static_folder = app.static_folder
    requested_path = os.path.join(static_folder, path)

    if path and os.path.exists(requested_path):
        return send_from_directory(static_folder, path)
    return send_from_directory(static_folder, "index.html")



