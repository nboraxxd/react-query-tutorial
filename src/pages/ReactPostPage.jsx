import React, { useEffect, useState } from 'react'
import * as Servives from '../services/index'
import Loading from '../components/Loading'

const ReactPostPage = () => {
  const [listPost, setListPost] = useState([])
  const [clicked, setClicked] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onClick = () => {
    setClicked(true)
  }

  const fetchAllPost = async () => {
    setIsLoading(true)
    try {
      Servives.getAllPosts().then((res) => {
        if (res?.status === 200) {
          setListPost(res.data)
          setIsSuccess(true)
        } else {
          setIsError(true)
        }
        setIsLoading(false)
        setClicked(false)
      })
    } catch (error) {
      setIsError(true)
      setIsLoading(false)
      setClicked(false)
    }
  }

  useEffect(() => {
    if (clicked) {
      fetchAllPost()
    }
  }, [clicked])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <h1>Error</h1>
  }

  return (
    <div className="content">
      <button onClick={onClick}>Call API</button>
      <h1>ReactPostPage</h1>
      {isSuccess &&
        listPost?.map((post) => {
          return (
            <div className="post__name" key={post.id}>
              {post.title}
            </div>
          )
        })}
    </div>
  )
}

export default ReactPostPage
