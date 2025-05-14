import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation , useNavigate } from 'react-router-dom';
import QRIS from '../aset/QRIS.png'

const Payment = () => {
  const { cart } = useLocation().state || { cart: [] };
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [bank, setBank] = useState('');
  const [eWallet, setEWallet] = useState('');
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, product) => total + parseInt(product.price.replace('Rp ', '').replace(',', '')), 0);

  const handleNameChange = (e) => setName(e.target.value);
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setBank('');
    setEWallet('');
  };
  const handleBankChange = (e) => setBank(e.target.value);
  const handleEWalletChange = (e) => setEWallet(e.target.value);
  const handlePayment = () => {
    if (!name) {
      alert('Mohon isi nama pemesan.');
      return;
    }
    if (!paymentMethod) {
      alert('Mohon pilih metode pembayaran.');
      return;
    }
    setNotification('Pembayaran berhasil ! Mengalihkan ke halaman struk...');
  
    setTimeout(() => {
      navigate('/success', { state: { cart, name, paymentMethod, bank, eWallet, totalPrice } });
    }, 2000);
  };

  return (
    <div className="payment-page">
      <Navbar />
      <h2>Bayar Pesanan</h2>

      <div className="payment-form">
        <label htmlFor="name">Nama Pemesan:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} placeholder="Masukkan Nama Pemesan" />

        <label htmlFor="payment-method">Metode Pembayaran:</label>
        <select id="payment-method" value={paymentMethod} onChange={handlePaymentMethodChange}>
          <option value="">-- Pilih Metode Pembayaran --</option>
          <option value="qris">QRIS</option>
          <option value="ewallet">E-Wallet</option>
          <option value="transferBank">Transfer Bank</option>
        </select>

        {paymentMethod === 'qris' && (
          <div className="qris-section">
            <h3>QRIS Pembayaran</h3>
            <p>Scan barcode berikut untuk melakukan pembayaran:</p>
            <img src={QRIS} alt="QRIS Barcode" className="qris-image" />
          </div>
        )}

        {paymentMethod === 'ewallet' && (
          <div className="ewallet-section">
            <h3>Pilih E-Wallet</h3>
            <select value={eWallet} onChange={handleEWalletChange}>
              <option value="">-- Pilih E-Wallet --</option>
              <option value="dana">DANA</option>
              <option value="gopay">GoPay</option>
              <option value="shopeepay">ShopeePay</option>
            </select>

            {eWallet === 'dana' && (
              <div>
                <p><strong>Nomor DANA:</strong> 081234567890</p>
                <p><strong>Nama:</strong> Beans & Bites</p>
              </div>
            )}
            {eWallet === 'gopay' && (
              <div>
                <p><strong>Nomor GoPay:</strong> 081234567890</p>
                <p><strong>Nama:</strong> Beans & Bites</p>
              </div>
            )}
            {eWallet === 'shopeepay' && (
              <div>
                <p><strong>Nomor ShopeePay:</strong> 0812345678905</p>
                <p><strong>Nama:</strong> Beans & Bites</p>
              </div>
            )}
          </div>
        )}

        {paymentMethod === 'transferBank' && (
          <div className="bank-section">
            <h3>Pilih Bank</h3>
            <select value={bank} onChange={handleBankChange}>
              <option value="">-- Pilih Bank --</option>
              <option value="bca">BCA</option>
              <option value="bri">BRI</option>
              <option value="mandiri">Mandiri</option>
              <option value="bni">BNI</option>
              <option value="bsi">BSI</option>
            </select>

            {bank === 'bca' && (
              <div>
                <p><strong>Nomor Rekening BCA:</strong> 1234567890</p>
                <p><strong>Nama:</strong> Beans & Bites</p>
              </div>
            )}
            {bank === 'bri' && (
              <div>
                <p><strong>Nomor Rekening BRI:</strong> 0987654321</p>
                <p><strong>Nama:</strong> Beans & Bites</p>
              </div>
            )}
            {bank === 'mandiri' && (
              <div>
                <p><strong>Nomor Rekening Mandiri:</strong> 1122334455</p>
                <p><strong>Nama:</strong> Beans & Bites</p>
              </div>
            )}
            {bank === 'bni' && (
              <div>
                <p><strong>Nomor Rekening BNI:</strong> 5566778899</p>
                <p><strong>Nama:</strong> Beans & Bites</p>
              </div>
            )}
            {bank === 'bsi' && (
              <div>
                <p><strong>Nomor Rekening BSI:</strong> 6677889900</p>
                <p><strong>Nama:</strong> Beans & Bites</p>
              </div>
            )}
          </div>
        )}

        <div className="cart-summary">
          <h3>Daftar Pesanan</h3>
          <div className="order-items">
            {cart.map((product, index) => (
              <div key={index} className="order-item">
                <p>{product.name} - {product.price}</p>
              </div>
            ))}
          </div>
          <h4>Total Harga: Rp {totalPrice.toLocaleString()}</h4>
        </div>

         <button className="pay-now" onClick={handlePayment}>Bayar Sekarang</button>

        {notification && (
          <div className="notification">{notification}</div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
