import sys , os
from sqlalchemy import engine_from_config
from zope.sqlalchemy import register
from pyramid.paster import get_appsettings
from backend.models.meta import Base, DBSession

# tambahkan root paket ke sys.path
root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if root not in sys.path:
    sys.path.insert(0, root)

from backend.models.meta import Base, DBSession
from sqlalchemy import engine_from_config
from pyramid.paster import get_appsettings

def main():
    config_uri = sys.argv[1]
    settings = get_appsettings(config_uri)
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.create_all(engine)
    print("Tabel berhasil dibuat!")

if __name__ == '__main__':
    main()
