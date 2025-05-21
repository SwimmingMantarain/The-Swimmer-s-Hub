from flask import url_for, redirect, Blueprint
from models import User, db
from flask_login import current_user

defaults = Blueprint('defaults', __name__)

@defaults.route("/", methods=['GET'])
def root():
    if current_user.is_authenticated:
        user = User.query.filter_by(id=current_user.id).first()
        return redirect(url_for('user_profile.profile', user_name=user.username))
    else:
        return redirect(url_for('auth.login'))