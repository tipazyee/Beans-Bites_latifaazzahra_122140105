from sqlalchemy import engine_from_config
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DBSession = scoped_session(sessionmaker())
Base      = declarative_base()

def configure_sqlalchemy(settings):
    """
    Build engine dari settings, bind ke DBSession dan Base.metadata.
    Settings di development.ini harus punya prefix sqlalchemy.*
    """
    engine = engine_from_config(settings, prefix='sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine

def includeme(config):
    """
    Pyramid includeme hook. Akan dipanggil oleh config.include(...)
    """
    settings = config.get_settings()
    configure_sqlalchemy(settings)
