from flask import Blueprint, render_template
from services.swimrankings import fetch_pb
from models import TrainingSession
from flask_login import login_required

user_profile = Blueprint('user_profile', __name__)

@user_profile.route('/profile/<user_id>', methods=['GET'])
@login_required
def profile(user_id):
    pbs = fetch_pb(user_id)
    sessions = TrainingSession.query.filter_by(user_id=user_id).all()
    return render_template('profile.html', pbs=pbs, sessions=sessions)
