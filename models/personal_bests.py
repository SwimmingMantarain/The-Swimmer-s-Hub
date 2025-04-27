from models import db

class PersonalBests(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    event = db.Column(db.String(120), nullable=False)
    course = db.Column(db.String(120), nullable=False)
    time = db.Column(db.String(120), nullable=False)
    updated = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'event': self.event,
            'course': self.course,
            'time': self.time,
            'updated': self.updated.strftime('%d-%m-%Y'),
        }
