from flask import Blueprint, render_template, request
from flask_login import login_required, current_user
from models import db, User
from services import get_swimmer_id

db_api = Blueprint('db_api', __name__)

@db_api.route("/db/post/find_swimrankings_id", methods=["POST"])
@login_required
def find_swimrankings_id():
    print(request.form.items())
    first_name = request.form['firstname']
    last_name = request.form['lastname']

    id = get_swimmer_id(first_name, last_name)

    if id:
        current_user.swimrankings_id = id
    current_user.added_swimrankings = True
    db.session.commit()
