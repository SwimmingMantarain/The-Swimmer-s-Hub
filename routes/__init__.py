# Import routes to make them accessible via the routes package
from routes.auth import auth
from routes.user_profile import user_profile
from routes.defaults import defaults

__all__ = ['auth', 'user_profile', 'defaults']
