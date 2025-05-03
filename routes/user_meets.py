from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_login import current_user, login_required
from models import db, UserMeet
from services import scrape_live_swimrankings, get_meat
import ast

user_meets = Blueprint('user_meets', __name__)

@user_meets.route("/add-meat", methods=["GET", "POST"])
@login_required
def add_meat():
    if request.method == "POST":
        selected_individuals = request.form.getlist('entry')

        for select_individual in selected_individuals:
            processed_individual = get_meat(ast.literal_eval(select_individual))

            if not UserMeet.query.filter_by(meet_name=processed_individual[0]).first():
                new_entry = UserMeet(
                    user_id = current_user.id,
                    meet_url = f"https://live.swimrankings.net/{select_individual}/",
                    meet_date = processed_individual[3],
                    meet_course = processed_individual[1],
                    meet_city = processed_individual[2],
                    meet_name = processed_individual[0],
                )

                db.session.add(new_entry)

        db.session.commit()

        flash('Meet(s) added successfully!')

        return redirect(url_for('user_profile.profile', user_name=current_user.username))
    entries = scrape_live_swimrankings()
    return render_template('user/meets/add_meets.html', entries=entries)
