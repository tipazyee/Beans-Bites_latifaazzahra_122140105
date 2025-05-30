import React, { useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.js'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import QRIS from '../aset/QRIS.png'
import { addOrder , finalizeOrder } from '../api/orderAPI';

export default function Payment() {
  const { cart, checkout } = useCart()
  const [name, setName] = useState('')
  const [method, setMethod] = useState('')
  const [bank, setBank] = useState('')
  const [eWallet, setEwallet] = useState('')
  const [notification, setNotification] = useState('')
  const navigate = useNavigate()
  const order = JSON.parse(localStorage.getItem('currentOrder'));

  const totalPrice = cart.reduce((sum, it) => sum + it.product.price * it.quantity, 0)

  const [isSuccess, setIsSuccess] = useState(false); 

  const handlePayment = () => {
  const paymentDetails = method === 'bank' ? bank : method === 'ewallet' ? eWallet : '-';

  const payload = {
    customer_name: name,
    payment_method: method,
    payment_details: paymentDetails,
    items: cart.map(it => ({
      product_id: it.product.id,
      quantity: it.quantity,
      price: it.product.price
    }))
  };

  addOrder(payload)
    .then((order) => {
  if (!order?.id) throw new Error("Gagal mendapatkan ID order");

    checkout();

    setNotification('Pembayaran berhasil!');

    setTimeout(() => {
      navigate('/success', {
        state: {
          name,
          method,
          bank,
          eWallet,
          items: cart.map(it => ({
            name: it.product.name,
            quantity: it.quantity,
            price: it.product.price
          })),
          totalPrice
        }
      });
    }, 1500); 
  })

    .catch(err => {
      console.error('Gagal finalize:', err);
      alert('Gagal menyimpan atau finalize order. Coba lagi.');
    });
};

  return (
    <div className="payment-page">
      <Navbar />
      <main className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Bayar Pesanan</h2>

        <div className="form-group">
        <label>Nama Pemesan:</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Masukkan Nama Pemesan" /></div>

        <div className="form-group">
        <label>Metode Pembayaran:</label>
        <select value={method} onChange={e => { setMethod(e.target.value); setBank(''); setEwallet('') }}>
          <option value="">-- Pilih Metode --</option>
          <option value="qris">QRIS</option>
          <option value="ewallet">E-Wallet</option>
          <option value="bank">Transfer Bank</option>
        </select></div>

        {method === 'qris' && (
          <div className="form-group">
            <h3>Scan QRIS</h3>
            <img src={QRIS} alt="QRIS" className="qris-image" />
          </div>
        )}

        {method === 'ewallet' && (
          <div className="form-group">
            <h3>Pilih E-Wallet</h3>
            <select
              className="input"
              value={eWallet}
              onChange={e => setEwallet(e.target.value)}
            >
              <option value="">-- Pilih --</option>
              <option value="DANA">DANA</option>
              <option value="GoPay">GoPay</option>
              <option value="ShopeePay">ShopeePay</option>
            </select>
            {eWallet && (
              <div className="payment-info">
                <p><strong>Nomor {eWallet}:</strong> 081234567890</p>
                <p><strong>Atas Nama:</strong> Beans & Bites</p>
              </div>
            )}
          </div>
        )}

        {method === 'bank' && (
          <div className="form-group">
            <h3>Pilih Bank</h3>
            <select
              className="input"
              value={bank}
              onChange={e => setBank(e.target.value)}
            >
              <option value="">-- Pilih Bank --</option>
              <option value="BCA">BCA</option>
              <option value="BRI">BRI</option>
              <option value="Mandiri">Mandiri</option>
              <option value="BNI">BNI</option>
            </select>
            {bank && (
              <div className="payment-info">
                <p><strong>Nomor Rek {bank}:</strong> 1234567890</p>
                <p><strong>Atas Nama:</strong> Beans & Bites</p>
              </div>
            )}
          </div>
        )}

        <h3>Daftar Pesanan</h3>
        {cart.length === 0 ? (
          <p>Keranjang kosong</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Menu</th>
                <th>Harga</th>
                <th>Qty</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((it, i) => (
                <tr key={i}>
                  <td>{it.product.name}</td>
                  <td>Rp {it.product.price.toLocaleString('id-ID')}</td>
                  <td>{it.quantity}</td>
                  <td>Rp {(it.product.price * it.quantity).toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h3>Total Harga: Rp {totalPrice.toLocaleString('id-ID')}</h3>

        <button onClick={handlePayment}>Bayar Sekarang</button>

        {notification && <p>{notification}</p>}
      </main>
      <Footer />
    </div>
  )
}

