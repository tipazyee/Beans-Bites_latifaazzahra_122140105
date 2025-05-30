from sqlalchemy import text
from pyramid.view import view_config
from pyramid.response import Response
from backend.models import DBSession, Order, OrderItem, Product

@view_config(route_name='orders', request_method='GET', renderer='json')
def get_orders(request):
    session = request.dbsession
    result = session.execute(text("""
        SELECT
            o.id AS order_id,
            o.customer_name,
            o.payment_method,
            o.payment_details,
            o.created_at,
            p.name AS product_name,
            oi.quantity,
            oi.price
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON oi.product_id = p.id
        ORDER BY o.created_at DESC
    """))

    return [
        {
            'order_id': row.order_id,
            'customer_name': row.customer_name,
            'payment_method': row.payment_method,
            'payment_details': row.payment_details,
            'created_at': row.created_at.isoformat() if row.created_at else None,
            'product_name': row.product_name,
            'quantity': row.quantity,
            'price': row.price
        }
        for row in result.fetchall()
    ]

@view_config(route_name='orders', request_method='POST', renderer='json')
def add_order(request):
    session = request.dbsession
    data = request.json_body

    # Simpan Order dulu
    new_order = Order(
        customer_name=data['customer_name'],
        payment_method=data['payment_method'],
        payment_details=data['payment_details']
    )
    session.add(new_order)
    session.flush()  # Biar dapet order.id

    # Simpan item & update stok
    for item in data['items']:
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=item['product_id'],
            quantity=item['quantity'],
            price=item['price']
        )
        session.add(order_item)

        # 🔥 Update stok
        product = session.query(Product).get(item['product_id'])
        if product.stock >= item['quantity']:
            product.stock -= item['quantity']
        else:
            raise HTTPBadRequest(json_body={'error': 'Stok tidak cukup'})

    return {'id': new_order.id}
