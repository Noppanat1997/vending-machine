import ormar
import sqlalchemy
import databases
from enum import Enum
from .config import settings

database = databases.Database(settings.db_url)
metadata = sqlalchemy.MetaData()


class BaseMeta(ormar.ModelMeta):
    metadata = metadata
    database = database


class RoleEnum(Enum):
    CUSTOMER = 'CUSTOMER'
    VMACHINE = 'VMACHINE'


class User(ormar.Model):
    class Meta(BaseMeta):
        tablename = "users"

    id: int = ormar.Integer(primary_key=True)
    name: str = ormar.String(max_length=60)
    role: str = ormar.String(
        max_length=60, choices=list(RoleEnum), nullable=False)


engine = sqlalchemy.create_engine(settings.db_url)
metadata.create_all(engine)
