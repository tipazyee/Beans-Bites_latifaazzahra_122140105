import React from 'react';

const CartItem = ({ item, image, onRemove, onChangeQuantity }) => {
  return (
    <div className="cart-item">
      <img src={image} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover' }} />
      <div>
        <h4>{item.name}</h4>
        <p>Harga: Rp {item.price}</p>
        <input
          type="number"
          value={item.quantity}
          min="1"
          onChange={(e) => onChangeQuantity(item.id, parseInt(e.target.value))}
        />
        <button onClick={() => onRemove(item.id)}>Hapus</button>
      </div>
    </div>
  );
};

export default CartItem;
