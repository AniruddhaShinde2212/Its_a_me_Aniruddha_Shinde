import { useState } from 'react'
import './App.css'
import Nav from './components/Nav/Nav'
import StatusBar from './components/StatusBar/StatusBar'
import Home from './pages/Home/Home'
import Schema from './pages/Schema/Schema'
import Logs from './pages/Logs/Logs'
import Status from './pages/Status/Status'

function App() {
  const [page, setPage] = useState('home')
  const pages = { home: Home, schema: Schema, logs: Logs, status: Status }
  const CurrentPage = pages[page]

  return (
    <div className="app">
      <Nav page={page} setPage={setPage} />
      <main className="app__main">
        <CurrentPage setPage={setPage} />
      </main>
      <StatusBar />
    </div>
  )
}

export default App
