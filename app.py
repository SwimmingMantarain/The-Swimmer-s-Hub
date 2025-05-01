from flask import Flask
from flask_login import LoginManager
from models import db, User
from routes import auth, user_profile, defaults
import config

app = Flask(__name__)
app.config.from_object(config.Config)

# Initialize SQLAlchemy
db.init_app(app)

with app.app_context():
    db.create_all()

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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
