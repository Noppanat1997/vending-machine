import databases
from .config import settings

database = databases.Database(settings.db_url)
