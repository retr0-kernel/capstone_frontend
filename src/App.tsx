import './App.css'
import { AuthProvider } from './providers/AuthProvider'
import { Router } from './router'

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App;