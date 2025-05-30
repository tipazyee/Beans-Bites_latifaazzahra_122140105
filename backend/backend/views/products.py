from pyramid.view import view_config
from ..models.mymodel import Product,OrderItem
from ..models.meta import DBSession
from pyramid.response import Response
import traceback

@view_config(route_name='products', renderer='json', request_method='GET')
def get_products(request):
    session = DBSession()
    prods = session.query(Product).order_by(Product.id).all()
    return [p.to_dict() for p in prods]

@view_config(route_name='products', request_method='POST', renderer='json')
def add_product(request):
    data = request.json_body

    required_fields = ['name', 'category', 'price', 'stock']
    for field in required_fields:
        if not data.get(field):
            return Response(json_body={'error': f'{field} tidak boleh kosong'}, status=400)

    try:
        new_product = Product(
            name=data['name'],
            category=data['category'],
            price=float(data['price']),
            stock=int(data['stock']),
            image_url=data.get('image_url')
        )
        request.dbsession.add(new_product)
        return {'message': 'Produk ditambahkan'}
    except Exception as e:
        return Response(json_body={'error': f'Gagal simpan: {str(e)}'}, status=500)

@view_config(route_name='product', renderer='json', request_method='PUT')
def update_product(request):
    pid = int(request.matchdict['id'])
    data = request.json_body
    session = DBSession()
    p = session.query(Product).get(pid)
    if not p:
        return {'status': 'error', 'error': 'Produk tidak ditemukan'}
    for field in ('name','category','price','stock','image_url'):
        if field in data:
            setattr(p, field, data[field])
    session.commit()
    return {'status': 'success'}

@view_config(route_name='product', request_method='DELETE', renderer='json')
def delete_product(request):
    pid = int(request.matchdict['id'])
    session = DBSession()

    session.query(OrderItem).filter_by(product_id=pid).delete()

    p = session.query(Product).get(pid)
    if not p:
        return {'status': 'error', 'error': 'Produk tidak ditemukan'}
    
    session.delete(p)
    session.commit()
    return {'status': 'success'}

@view_config(route_name='products', request_method='OPTIONS', renderer='json')
def product_options(request):
    return {}
