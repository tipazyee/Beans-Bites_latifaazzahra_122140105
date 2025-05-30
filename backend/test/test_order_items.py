import time
from transaction import commit
from backend.models.meta import DBSession

def test_finalize_order(app):
    response = app.post_json('/api/products', {
        'name': 'Final Product',
        'category': 'Snack',
        'price': 10000,
        'stock': 5
    })
    assert response.status_code == 200, f"Gagal buat produk: {response.json}"
    product_id = response.json.get('product', {}).get('id')
    assert product_id is not None, "Produk tidak punya 'id'"

    order_response = app.post_json('/api/orders', {
        'customer_name': 'Sari',
        'payment_method': 'Transfer',
        'payment_details': '123',
        'items': [{
            'product_id': product_id,
            'quantity': 1,
            'price': 10000
        }]
    })
    assert order_response.status_code == 200, f"Gagal buat order: {order_response.json}"
    order_id = order_response.json.get('id')
    assert order_id is not None, "Order tidak punya 'id'"

    res = app.post_json('/api/orders/finalize', {'order_id': order_id})
    assert res.status_code == 200, f"Finalisasi gagal: {res.json}"
    assert res.json['message'] == 'Order berhasil diselesaikan'
