from flask import Blueprint, render_template, request, redirect, url_for
from models import TrainingSession, db
from flask_login import login_required, current_user

training_sessions = Blueprint('training_sessions', __name__)

@training_sessions.route('/create_session', methods=['GET', 'POST'])
@login_required
def create():
    if request.method == 'POST':
        name = request.form['session_name']
        distance = request.form['session_distance']

        new_session = TrainingSession(name=name, distance=distance, user_id=current_user.id)

        db.session.add(new_session)
        db.session.commit()

        return redirect(url_for('user_profile.profile', user_name=current_user.username))
    return render_template('create_session.html')

@training_sessions.route('/edit_session/<username>/<session_id>', methods=['GET', 'POST'])
@login_required
def edit(username, session_id):
    return render_template('edit_session.html', username=username, session_id=session_id)

@training_sessions.route('/view_sessions', methods=['GET'])
@login_required
def view():
    return "<h1>view Session</h1>"
