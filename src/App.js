import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import ReactQueryPostPage from './pages/ReactQueryPostPage'
import ReactPostPage from './pages/ReactPostPage'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5000,
      },
    },
  })

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
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
