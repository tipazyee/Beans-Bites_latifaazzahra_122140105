import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Success = () => {
  const navigate = useNavigate();
  const { cart, name, paymentMethod, bank, eWallet, totalPrice } = useLocation().state || {};

  const handlePrint = () => {
    setTimeout(() => {
      window.print();
    }, 300);
  };

  if (!cart) {
    return (
      <div>
        <p>Tidak ada data transaksi.</p>
        <button onClick={() => navigate('/')}>Kembali ke Beranda</button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="success-page printable">
        <h2>Pembayaran Berhasil</h2>
        <p>Terima kasih, <strong>{name}</strong>, pembayaran Anda telah berhasil.</p>

        <div className="payment-summary">
          <h3>Rincian Pesanan:</h3>
          <ul>
            {cart.map((product, idx) => (
              <li key={idx}>{product.name} - {product.price}</li>
            ))}
          </ul>
          <p><strong>Total Pembayaran:</strong> Rp {totalPrice.toLocaleString()}</p>
          <p><strong>Metode Pembayaran:</strong> {paymentMethod === 'qris' ? 'QRIS' : paymentMethod === 'ewallet' ? `E-Wallet (${eWallet})` : `Transfer Bank (${bank})`}</p>
        </div>

        <button onClick={handlePrint}>Cetak Struk</button>
        <button onClick={() => navigate('/')}>Kembali ke Beranda</button>
      </div>
      <Footer />
    </>
  );
};

export default Success;
