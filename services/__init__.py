# Import services to make them accessible via the services package
from services.swimrankings import get_swimmer_id, get_swimmer_pbs

__all__ = ['get_swimmer_id', 'get_swimmer_pbs']
