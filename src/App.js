import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import ReactQueryPostPage from './pages/ReactQueryPostPage'
import ReactPostPage from './pages/ReactPostPage'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/react-query" element={<ReactQueryPostPage />}></Route>
          <Route path="/react" element={<ReactPostPage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App