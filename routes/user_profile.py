from flask import Blueprint, render_template
from flask_login import login_required, current_user
from services.swimrankings import SwimrankingsScraper
from models import TrainingSession

user_profile = Blueprint('user_profile', __name__)
scraper = SwimrankingsScraper()

@user_profile.route('/profile/<user_name>', methods=['GET'])
@login_required
def profile(user_name):
    pbs = None
    if current_user.swimrankings_id:
        athlete = scraper.get_athlete(current_user.swimrankings_id)
        pbs = athlete.list_personal_bests()
    sessions = TrainingSession.query.filter_by(user_id=current_user.id).all()
    return render_template('profile.html', pbs=pbs, sessions=sessions, user=current_user)
