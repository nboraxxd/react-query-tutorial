import React from 'react'
import { useQuery, useIsFetching } from '@tanstack/react-query'
import * as Servives from '../services'
import Loading from '../components/Loading'

const ReactQueryPostPage = () => {
  const fetchPosts = async () => {
    const res = await Servives.getAllPosts()
    return res.data
  }

  const fetchingCount = useIsFetching()

  const {
    data: listPost,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    retry: 2,
    retryDelay: 2000,
    retryOnMount: false,
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <h1>Error</h1>
  }

  console.log('🔥 ~ ReactQueryPostPage ~ fetchingCount ~ isFetching:', fetchingCount, isFetching)

  return (
    <div className="content">
      <h1>ReactQueryPostPage</h1>
      {listPost.map((post) => {
        return (
          <div className="post__name" key={post.id}>
            {post.title}
          </div>
        )
      })}
    </div>
  )
}

export default ReactQueryPostPage
