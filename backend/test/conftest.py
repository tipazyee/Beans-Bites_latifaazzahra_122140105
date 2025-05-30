import pytest
from webtest import TestApp
from pyramid.paster import get_app

@pytest.fixture(scope='session')
def app():
    app = get_app('development.ini')  
    return TestApp(app)
