from flask_migrate import Migrate
from app import app, db

# Initialize Flask-Migrate
migrate = Migrate(app, db)

# This allows to run migrations from the command line using:
# flask db init
# flask db migrate -m "Initial migration."
# flask db upgrade

if __name__ == '__main__':
    # This script can be run directly if needed
    from flask.cli import FlaskGroup
    cli = FlaskGroup(app)
    cli()
