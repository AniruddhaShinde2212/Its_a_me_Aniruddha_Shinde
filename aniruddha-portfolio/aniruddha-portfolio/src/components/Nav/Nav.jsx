import { useState, useEffect } from 'react'
import './Nav.css'

const NAV_ITEMS = [
  { id: 'home',   path: '/home',   label: 'home',   icon: '~' },
  { id: 'schema', path: '/schema', label: 'schema', icon: '⬡' },
  { id: 'logs',   path: '/logs',   label: 'logs',   icon: '≡' },
  { id: 'status', path: '/status', label: 'status', icon: '◉' },
]

function Nav({ page, setPage }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const ts = time.toISOString().replace('T', ' ').slice(0, 19) + ' UTC'

  return (
    <nav className="nav">
      <div className="nav__left">
        <span className="nav__prompt">aniruddha@dataeng</span>
        <span className="nav__sep">:</span>
        <span className="nav__path">/{page}</span>
        <span className="nav__cursor">█</span>
      </div>

      <div className="nav__links">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`nav__link${page === item.id ? ' nav__link--active' : ''}`}
            onClick={() => setPage(item.id)}
          >
            <span className="nav__link-icon">{item.icon}</span>
            {item.path}
          </button>
        ))}
      </div>

      <div className="nav__right">
        <span className="nav__time">{ts}</span>
      </div>
    </nav>
  )
}

export default Nav
