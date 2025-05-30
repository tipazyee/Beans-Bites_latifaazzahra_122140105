import time
from transaction import commit
from backend.models.meta import DBSession


def test_create_order_and_reduce_stock(app):
    # Tambah produk
    response = app.post_json('/api/products', {
        'name': 'Product Order',
        'category': 'Drink',
        'price': 15000,
        'stock': 10,
        'image_url': ''
    })

    assert response.status_code == 200, f"Gagal buat produk: {response.json}"
    product_id = response.json.get('product', {}).get('id')
    assert product_id is not None, "Produk tidak punya 'id'"

    # Buat order
    order_res = app.post_json('/api/orders', {
        'customer_name': 'Budi',
        'payment_method': 'Cash',
        'payment_details': '123456',
        'items': [{
            'product_id': product_id,
            'quantity': 2,
            'price': 15000
        }]
    })

    assert order_res.status_code == 200, f"Gagal buat order: {order_res.json}"
    assert 'id' in order_res.json

def test_get_orders(app):
    res = app.get('/api/orders')
    assert res.status_code == 200
    assert isinstance(res.json, list)
