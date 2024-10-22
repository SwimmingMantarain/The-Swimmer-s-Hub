from flask import Blueprint, render_template, request
from models import TrainingSession
from flask_login import login_required

training_sessions = Blueprint('training_sessions', __name__)

@training_sessions.route('/training_sessions', methods=['GET'])
def get_training_sessions():
    sessions = TrainingSession.query.all()
    return render_template('partials/_training_sessions.html', sessions=sessions)

@training_sessions.route('/create_session', methods=['GET', 'POST'])
@login_required
def create():
    if request.method == 'POST':
        data = request.form
        print(data)
    return render_template('create_session.html')

@training_sessions.route('/edit_session', methods=['GET', 'POST'])
@login_required
def edit():
    return "<h1>edit Session</h1>"

@training_sessions.route('/view_sessions', methods=['GET'])
@login_required
def view():
    return "<h1>view Session</h1>"
