from models import db

class UserMeet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    meet_url = db.Column(db.String(255), nullable=False)
    meet_date = db.Column(db.Date, nullable=False)
    meet_course = db.Column(db.Integer, nullable=False)
    meet_city = db.Column(db.String(100), nullable=False)
    meet_name = db.Column(db.String(100), nullable=False)
