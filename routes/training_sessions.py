from flask import Blueprint, render_template
from models import TrainingSession

training_sessions = Blueprint('training_sessions', __name__)

@training_sessions.route('/training_sessions', methods=['GET'])
def get_training_sessions():
    sessions = TrainingSession.query.all()
    return render_template('partials/_training_sessions.html', sessions=sessions)
