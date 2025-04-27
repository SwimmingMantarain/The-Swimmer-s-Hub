# Import routes to make them accessible via the routes package
from routes.auth import auth
from routes.training_sessions import training_sessions, UPLOAD_FOLDER
from routes.user_profile import user_profile
from routes.defaults import defaults

__all__ = ['auth', 'training_sessions', 'user_profile', 'defaults', 'UPLOAD_FOLDER']
