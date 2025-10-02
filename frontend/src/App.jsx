import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <>
      <Navbar />
      <div className="app-layout">
        
          <Sidebar />
        
        <Hero />
      </div>
    </>
  )
}

export default App
