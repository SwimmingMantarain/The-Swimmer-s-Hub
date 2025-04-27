from models import db

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
