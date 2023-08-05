import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import { ReactQueryPostDetail, ReactQueryPostPage } from './pages/ReactQuery'
import { ReactPostDetail, ReactPostPage } from './pages/PureReact'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/react" element={<ReactPostPage />} />
          <Route path="/react/:id" element={<ReactPostDetail />} />
          <Route path="/react-query" element={<ReactQueryPostPage />} />
          <Route path="/react-query/:id" element={<ReactQueryPostDetail />} />
        </Routes>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
