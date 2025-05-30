import pytest
from pyramid.httpexceptions import HTTPBadRequest
from backend.models import Product
from backend.models.meta import DBSession

def test_get_products(app):
    res = app.get('/api/products')
    assert res.status_code == 200
    assert isinstance(res.json, list)

def test_create_product_success(app):
    res = app.post_json('/api/products', {
        'name': 'Test Product',
        'category': 'Test',
        'price': 1000,
        'stock': 5,
        'image_url': 'https://example.com/image.jpg'
    })
    assert res.status_code == 200
    assert res.json['message'] == 'Produk ditambahkan'

def test_create_product_missing_fields(app):
    res = app.post_json('/api/products', {
        'category': 'Test',
        'price': 1000,
        'stock': 5
    }, expect_errors=True)
    assert res.status_code == 400

def test_update_product(app):
    created = app.post_json('/api/products', {
        'name': 'Test Update',
        'category': 'Test',
        'price': 2000,
        'stock': 10
    }).json
    pid = DBSession.query(Product).order_by(Product.id.desc()).first().id
    res = app.put_json(f'/api/products/{pid}', {
        'name': 'Updated Name'
    })
    assert res.json['status'] == 'success'

def test_delete_product(app):
    res = app.post_json('/api/products', {
        'name': 'ToDelete',
        'category': 'Del',
        'price': 100,
        'stock': 1
    })
    pid = DBSession.query(Product).order_by(Product.id.desc()).first().id
    res = app.delete(f'/api/products/{pid}')
    assert res.json['status'] == 'success'

    DBSession.flush()
