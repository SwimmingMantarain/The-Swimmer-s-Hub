from flask import Flask
from flask_login import LoginManager
from flask_migrate import Migrate
from models import db, User, UserMeet
from werkzeug.security import generate_password_hash
from routes import auth, user_profile, defaults, db_api, user_meets
import config
import os

app = Flask(__name__)
app.config.from_object(config.Config)

# Initialize SQLAlchemy
db.init_app(app)

with app.app_context():
    db.create_all()

migrate = Migrate(app, db)

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'auth.login'  # Redirect to login page if not logged in

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Register Blueprints for routes
app.register_blueprint(auth)
app.register_blueprint(user_profile)
app.register_blueprint(defaults)
app.register_blueprint(db_api)
app.register_blueprint(user_meets)

# Create test user if it doesn't already exist
with app.app_context():
    test_email = 'tester@testing.tested'
    test_username = 'Balls'

    # Check if user exists by email or username
    existing_user_email = User.query.filter_by(email=test_email).first()
    existing_user_name = User.query.filter_by(username=test_username).first()

    if not existing_user_email and not existing_user_name:
        # Create new test user if neither email nor username exists
        test_user = User(
            email=test_email,
            password_hash=generate_password_hash('testicles'),
            username=test_username
        )
        db.session.add(test_user)
        db.session.commit()
        print(f"Test user created with email: {test_email} and username: {test_username}")
    else:
        print(f"Test user already exists with email: {test_email} or username: {test_username}")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
