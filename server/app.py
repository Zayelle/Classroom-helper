from flask import Flask
from server.routes.api import api
from server.database.db import db
from server.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize the database
    db.init_app(app)
    
    # Register the API blueprint
    app.register_blueprint(api,)
    
    return app



