import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import Loading from '../components/Loading'
import * as Servives from '../services'

const ReactQueryPostPage = () => {
  const [isClicked, setIsClicked] = useState(false)

  const onClick = () => {
    setIsClicked(true)
  }

  const fetchPosts = async () => {
    const res = await Servives.getAllPosts()
    return res.data
  }

  const {
    data: listPost,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    enabled: isClicked,
  })

  if (isLoading) {
    return (
      <>
        <button onClick={onClick}>Call API</button>
        <Loading />
      </>
    )
  }

  if (isError) {
    return <h1>Error</h1>
  }

  return (
    <div className="content">
      <button onClick={onClick}>Call API</button>
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
