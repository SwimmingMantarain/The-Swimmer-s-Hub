from flask import Blueprint, render_template, request, redirect, url_for, jsonify
from models import TrainingSession, User, db
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
    session = TrainingSession.query.filter_by(id=session_id).first()
    return render_template('edit_session.html', session=session)

@training_sessions.route('/delete_session/<username>/<session_id>', methods=['POST'])
@login_required
def delete(username, session_id):
    user = User.query.filter_by(username=username).first()
    session = TrainingSession.query.filter_by(id=session_id).first()
    if user.id == session.user_id:
        db.session.delete(session)
        db.session.commit()
        return redirect(url_for('user_profile.profile', user_name=current_user.username))
    
    else:
        flash("Not your session")
        return redirect(url_for('user_profile.profile', user_name=current_user.username))

@training_sessions.route('/view_sessions', methods=['GET'])
@login_required
def view():
    return "<h1>view Session</h1>"
