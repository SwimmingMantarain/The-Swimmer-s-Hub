# Import routes to make them accessible via the routes package
from routes.auth import auth
from routes.user_profile import user_profile
from routes.defaults import defaults
from routes.db_api import db_api

__all__ = ['auth', 'user_profile', 'defaults', 'db_api']
