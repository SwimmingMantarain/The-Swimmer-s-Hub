from flask import Blueprint, render_template, request, redirect, url_for, jsonify, flash, send_file
from models import TrainingSession, User, db
from werkzeug.utils import secure_filename
from flask_login import login_required, current_user
import os, datetime

UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

training_sessions = Blueprint('training_sessions', __name__)

@training_sessions.route('/upload_session', methods=['GET', 'POST'])
@login_required
def upload():
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']

        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)

        if file and allowed_file(file.filename):
            # Create a directory for the user with the name as the user id if it doesn't already exist
            user_directory = os.path.join(UPLOAD_FOLDER, str(current_user.id))
            if not os.path.exists(user_directory):
                os.makedirs(user_directory)
            
            # Create a directory in the user's directory for the session date if it doesn't already exist
            session_directory = os.path.join(user_directory, request.form['date'])
            if not os.path.exists(session_directory):
                os.makedirs(session_directory)

            # Change the filename to the time provided
            filename = request.form['time']
            filename = filename.replace(":", "")
            filename = secure_filename(filename)

            file_extension = os.path.splitext(file.filename)[1]
            filename = filename + file_extension

            # Path of the file
            filepath = os.path.join(session_directory, filename)

            # Turn the date from request.form into a python date object
            date = request.form['date']
            date = date.replace("-", "")
            date = datetime.datetime.strptime(date, "%Y%m%d").date()

            # Turn the time from request.form into a python time object
            time = request.form['time']
            time = time.replace(":", "")
            time = datetime.datetime.strptime(time, "%H%M%S").time()

            # Add the session to the database
            new_session = TrainingSession(user_id=current_user.id, date=date, path=filepath, time=time)
            db.session.add(new_session)
            db.session.commit()

            # Save the file
            file.save(filepath)

            return redirect(url_for('user_profile.profile', user_name=current_user.username))
    return render_template('create_session.html', )

@training_sessions.route('/delete_session/<username>/<session_id>', methods=['POST'])
@login_required
def delete(username, session_id):
    user = User.query.filter_by(username=username).first()
    session = TrainingSession.query.filter_by(id=session_id).first()
    if user.id == session.user_id:
        # Delete the file and if the directory is empty, delete it aswell
        path = session.path
        if os.path.exists(path):
            os.remove(path)
            directory = os.path.dirname(path)
            if not os.listdir(directory):
                os.rmdir(directory)

        db.session.delete(session)
        db.session.commit()

        return redirect(url_for('user_profile.profile', user_name=current_user.username))
    
    else:
        flash("Not your session")
        return redirect(url_for('user_profile.profile', user_name=current_user.username))

@training_sessions.route('/view_sessions', methods=['GET'])
@login_required
def view():
    sessions = TrainingSession.query.filter_by(user_id=current_user.id).all()
    return render_template('view_sessions.html', user=current_user, sessions=sessions)

@training_sessions.route('/fetch_session/<session_id>', methods=['GET'])
@login_required
def fetch(session_id):
    # Get the session image and return it to the js file
    session = TrainingSession.query.get(session_id)
    if session:
        return send_file(session.path, mimetype='image/gif')
    else:
        return 'no session found', 404

