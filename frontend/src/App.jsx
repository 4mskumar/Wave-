import './App.css'
import Home from './components/Home'
import Chat from './components/Chat'
import Profile from './components/Profile'
import Settings from './components/Settings'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


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
