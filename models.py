from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    swimrankings_id = db.Column(db.Integer, nullable=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class TrainingSession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    path = db.Column(db.String(120), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'date': self.date.strftime('%d-%m-%Y'),
            'time': self.time.strftime('%H:%M:%S'),
            'path': self.path,
        }

"""class TrainingSection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    training_session_id = db.Column(db.Integer, db.ForeignKey('trainingsession.id'), nullable=False)
    name = db.Column(db.String(120), nullable=False)

class TrainingBlock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    training_section_id = db.Column(db.Integer, db.ForeignKey('trainingsection.id'), nullable=False)
    distance = db.Column(db.Integer, nullable=False) # Placeholder"""

class Competition(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    date = db.Column(db.Date, nullable=False)
