import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
const HomePage = () => {
  const queryClient = useQueryClient()
  const queryKeys = [
    ['posts', 2],
    ['posts', 4],
  ]

  const data = queryKeys.map((queryKey) => queryClient.getQueryData(queryKey))
  console.log('🔥 ~ HomePage ~ queryClient:', data)

  const handleClearCache = () => {
    const arrClear = [
      ['posts', 2],
      ['posts', 3],
    ]
    arrClear.forEach((queryKey) => queryClient.removeQueries(queryKey))
  }

  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={handleClearCache}>Clear cache</button>
    </div>
  )
}

export default HomePage
