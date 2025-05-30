from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from .meta import Base, DBSession

class Product(Base):
    __tablename__ = 'products'

    id         = Column(Integer, primary_key=True)
    name       = Column(String(100), nullable=False)
    category   = Column(String(50), nullable=False)
    price      = Column(Float, nullable=False)
    stock      = Column(Integer, nullable=False, default=0)
    image_url  = Column(String(500), nullable=True)  

    order_items = relationship("OrderItem", back_populates="product")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'price': self.price,
            'stock': self.stock,
            'image_url': self.image_url,
        }

class Order(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime, server_default=func.now())

    customer_name = Column(String(255))
    payment_method = Column(String(50))
    payment_details = Column(String)

    order_items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = 'order_items'
    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey('orders.id'))
    product_id = Column(Integer, ForeignKey('products.id'))
    quantity = Column(Integer)
    price = Column(Float)

    order = relationship("Order", back_populates="order_items")  
    product = relationship("Product", back_populates="order_items")


