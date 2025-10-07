import './App.css'
import Home from './components/Home'
import Chat from './components/Chat'
import Profile from './components/Profile'
import Settings from './components/Settings'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage'


const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },  
  {
    path:'/chat',
    element:<Chat/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/settings',
    element:<Settings/>
  },
  {
    path:'/landing',
    element:<LandingPage/>
  }
])

function App() {

  return (
    <>
    <div className='zalando-sans'>
      <RouterProvider router={appRouter} />
    </div>
    </>
  )
}

export default App
