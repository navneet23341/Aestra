import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter ,Routes , Route} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Admin from './Admin.jsx'
import Home from './Home.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element= {<App/>}
        />

        <Route path="/home" element= {<ProtectedRoute><Home/></ProtectedRoute>}/>

        <Route
        path='/admin'
        element={<Admin/>}
        />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
