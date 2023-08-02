import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as Servives from '../../services'
import Loading from '../../components/Loading'

export default function ReactPostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState({})
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      try {
        Servives.getDetailsPost(id).then((res) => {
          if (res?.status === 200) {
            setPost(res.data)
            setIsSuccess(true)
          } else {
            setIsError(true)
          }
          setIsLoading(false)
        })
      } catch (error) {
        setIsError(true)
        setIsLoading(false)
      }
    })()
  }, [id])

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
