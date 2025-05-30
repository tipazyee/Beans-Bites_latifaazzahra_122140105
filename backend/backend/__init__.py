from backend.models.meta import configure_sqlalchemy
from backend.models.meta import includeme as sqlalchemy_includeme
from pyramid.config import Configurator
from .tweens import cors_tween_factory
from backend.views.products import product_options

from backend.models import (
    DBSession,
    Base,
    get_engine,
    get_session_factory,
    get_tm_session,
)

def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include('pyramid_tm')
    config.include('pyramid_debugtoolbar')
    config.include('backend.models.meta')

    configure_sqlalchemy(settings)
    config.include(sqlalchemy_includeme)

    engine = get_engine(settings)
    session_factory = get_session_factory(engine)
    config.registry['dbsession_factory'] = session_factory

    def dbsession(request):
        return get_tm_session(
            session_factory,
            transaction_manager=request.tm,
        )

    config.add_request_method(dbsession, 'dbsession', reify=True)

    config.add_route('products', '/api/products')
    config.add_route('product',       '/api/products/{id}')
    config.add_route('orders', '/api/orders')
    config.add_route('get_orders', '/api/orders')
    config.add_route('order',         '/api/orders/{id}')
    config.add_route('checkout', '/api/orders/{id}/checkout')
    config.add_route('order_items',      '/api/order_items')         
    config.add_route('order_item',       '/api/order_items/{id}')
    config.add_route('orders_finalize', '/api/orders/finalize')
    
    config.include('backend.routes')
    config.add_tween('backend.tweens.cors_tween_factory')

    config.scan() 

    return config.make_wsgi_app()