from flask import Blueprint, render_template
from flask_login import login_required, current_user
from models import UserMeet
from services import get_swimmer_pbs

user_profile = Blueprint('user_profile', __name__)

@user_profile.route('/profile/<user_name>', methods=['GET'])
@login_required
def profile(user_name):
    pbs = None
    try:
        pbs = get_swimmer_pbs(current_user.swimrankings_id)
    except Exception as e:
        print(f"Error fetching PBs: {e}")
    user_meets = UserMeet.query.filter_by(user_id=current_user.id).all()
    return render_template('user/profile.html', pbs=pbs, user=current_user, user_meets=reversed(user_meets))
