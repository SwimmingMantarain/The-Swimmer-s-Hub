from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Import models to make them available through models __package__
from models.user import User
from models.personal_bests import PersonalBests

__all__ = ['db', 'User', 'PersonalBests']
