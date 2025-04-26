from flask import Blueprint, render_template
from flask_login import login_required, current_user
from models import TrainingSession
from services import swimrankings

user_profile = Blueprint('user_profile', __name__)

@user_profile.route('/profile/<user_name>', methods=['GET'])
@login_required
def profile(user_name):
    pbs = None
    try:
        pbs = swimrankings.get_swimmer_pbs(current_user.swimrankings_id)
    except Exception as e:
        print(f"Error fetching PBs: {e}")
    sessions = TrainingSession.query.filter_by(user_id=current_user.id).all()
    return render_template('profile.html', pbs=pbs, sessions=sessions, user=current_user)
