from pyramid.view import view_config
from backend.models import DBSession, Order, OrderItem, Product
from pyramid.response import Response

@view_config(route_name='orders_finalize', request_method='POST', renderer='json')
def finalize_order(request):
    try:
        data = request.json_body
        order_id = data.get('order_id')
        if not order_id:
            return Response(json_body={'error': 'order_id diperlukan'}, status=400)

        order = request.dbsession.query(Order).filter_by(id=order_id).first()
        if not order:
            return Response(json_body={'error': 'Order tidak ditemukan'}, status=404)

        # misalnya update status order
        # order.status = 'Selesai'
        request.dbsession.flush()

        return {'message': 'Order berhasil diselesaikan'}
    except Exception as e:
        return Response(json_body={'error': str(e)}, status=500)
