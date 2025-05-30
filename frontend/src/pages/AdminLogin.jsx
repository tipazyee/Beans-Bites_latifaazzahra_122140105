import React, { useState } from 'react'
import { useNavigate }    from 'react-router-dom'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  const CREDENTIALS = {
    'user@admin.co.id': 'admin123',
    'other@admin.co.id': 'secret456'
  }

  const onSubmit = e => {
    e.preventDefault()
   
    if (CREDENTIALS[username] && CREDENTIALS[username] === password) {
 
      localStorage.setItem('adminLoggedIn', 'true')
      nav('/admin/dashboard')
    } else {
      alert('Username atau password salah!')
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 320, margin: 'auto', padding: 16 }}>
      <h2>Login Admin</h2>
      <div style={{ marginBottom: 8 }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: '100%', padding: 8 }}
          required
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: 8 }}
          required
        />
      </div>
      <button type="submit" style={{ width: '100%', padding: 10 }}>
        Login
      </button>
    </form>
  )
}
