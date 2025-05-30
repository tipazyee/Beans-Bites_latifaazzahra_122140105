import React ,{useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function Success() {
  const { state } = useLocation()
  const navigate = useNavigate();
  const location = useLocation();
  const {
    name = '',
    method = '',
    bank = '',
    eWallet = '',
    items = [],
    totalPrice = 0
  } = state || {}; 

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="success-page">
      <Navbar />
      <main className="container">
        <h2>Struk Pembayaran</h2>
        <p>Nama: {name}</p>
        <p>Metode Pembayaran: {method}</p>
        {(method === 'bank' && <p>Bank: {bank}</p>) || (method === 'ewallet' && <p>E-Wallet: {eWallet}</p>)}

        <h3>Daftar Pesanan:</h3>
        <ul>
         {Array.isArray(items) && items.map((item, i) => (
          <li key={i}>
            {item?.name || 'Item'} - {item?.quantity} x Rp {item?.price?.toLocaleString('id-ID') || 0}
          </li>
        ))}
        </ul>
        <h3>Total: Rp {totalPrice.toLocaleString('id-ID')}</h3>
        <button onClick={handlePrint} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
          Cetak Struk
        </button>
        <button
          onClick={() => navigate('/')}
          style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
        >
          Kembali ke beranda
        </button>
      </main>
      <Footer />
    </div>
  )
}
