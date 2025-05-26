from flask import Blueprint, request, redirect, url_for, flash
from flask_login import login_required, current_user
from models import db, UserMeet, User
from services import get_swimmer_id

db_api = Blueprint('db_api', __name__)

@db_api.route("/db/post/find_swimrankings_id", methods=["POST"])
@login_required
def find_swimrankings_id():
    try:
        first_name = request.form.get('firstname')
        last_name = request.form.get('lastname')

        if not first_name or not last_name:
            flash("First name and last name are required")
            return redirect(url_for('user_profile.profile', user_name=current_user.username))

        id = get_swimmer_id(first_name, last_name)

        if id:
            current_user.swimrankings_id = id
            flash("Successfully found your Swimrankings ID!")
        else:
            flash("Could not find your Swimrankings ID. Please check your name.")
            return redirect(url_for('user_profile.profile', user_name=current_user.username))

        current_user.added_swimrankings = True
        db.session.commit()

        return redirect(url_for('user_profile.profile', user_name=current_user.username))

    except Exception as e:
        flash(f"An error occurred: {str(e)}")
        return redirect(url_for('user_profile.profile', user_name=current_user.username))

@db_api.route("/db/post/remove_sr_id", methods=["POST"])
@login_required
def remove_sr_id():
    current_user.swimrankings_id = None
    current_user.added_swimrankings = False
    db.session.commit()
    flash("Successfully removed ID")
    return {"sucess": True, "message": "beans" }, 200

@db_api.route("/db/post/delete_account", methods=["POST", "GET"])
@login_required
def delete_account():
    try:
        db.session.delete(current_user)
        db.session.commit()
        flash("Your account has been deleted.")
        return redirect(url_for('auth.login'))

    except Exception as e:
        flash(f"An error occurred: {str(e)}")
        return redirect(url_for('user_profile.profile', user_name=current_user.username))

@db_api.route("/db/api/delete_meet", methods=["POST"])
@login_required
def delete_meet():
    try:
        meet_id = request.json.get('meet_id')

        if not meet_id:
            return {"success": False, "message": "Meet ID is required"}, 400

        meet = UserMeet.query.filter_by(id=meet_id, user_id=current_user.id).first()

        if not meet:
            return {"success": False, "message": "Meet not found or not authorized"}, 404

        db.session.delete(meet)
        db.session.commit()

        return {"success": True, "message": "Meet deleted successfully"}, 200

    except Exception as e:
        db.session.rollback()
        return {"success": False, "message": f"An error occurred: {str(e)}"}, 500

from werkzeug.security import generate_password_hash, check_password_hash

@db_api.route("/db/post/change_password", methods=["POST"])
@login_required
def change_password():
    old = request.form.get('old_pswd')
    new = request.form.get('new_pswd')
    confirm = request.form.get('confirm_pswd')

    if current_user.check_password(old):
        if check_password_hash(generate_password_hash(new), confirm):
            current_user.set_password(new)
            db.session.commit()

        else:
            return {"success": False, "message": "Passwords don't match"}, 400

    else:
        return {"success": False, "message": "Old password doesn't match"}, 300

    return {"success": True, "message": "beans"}, 200
