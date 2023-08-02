import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import useQueryPost from '../../hooks/useQueryPost'

export default function ReactQueryPostDetail() {
  const { id } = useParams()

  const { data: post, isLoading, isError, isSuccess } = useQueryPost({ id, staleTime: 2000 })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <h1>Error</h1>
  }

  return (
    isSuccess && (
      <div>
        <div className="flex gap-1">
          <h2 className="font-medium text-lg">Title:</h2>
          <p>{post.title}</p>
        </div>
        <div className="flex gap-1">
          <h2 className="font-medium text-lg">Desc:</h2>
          <p>{post.body}</p>
        </div>
      </div>
    )
  )
}
