from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required, current_user
from models import db, User
from services import get_swimmer_id

db_api = Blueprint('db_api', __name__)

@db_api.route("/db/post/find_swimrankings_id", methods=["POST"])
@login_required
def find_swimrankings_id():
    # Debug: Print all form data and request information
    print("Form data:", request.form)
    print("Content type:", request.content_type)
    print("Data:", request.data)

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

        current_user.added_swimrankings = True
        db.session.commit()

        return redirect(url_for('user_profile.profile', user_name=current_user.username))

    except Exception as e:
        flash(f"An error occurred: {str(e)}")
        return redirect(url_for('user_profile.profile', user_name=current_user.username))
