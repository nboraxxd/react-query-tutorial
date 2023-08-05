import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import * as Servives from '../../services'
import Loading from '../../components/Loading'

export default function ReactPostDetail() {
  const { id } = useParams()
  const [userList, setUserList] = useState([])
  const [post, setPost] = useState({})
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { state: userIdList } = useLocation()

  useEffect(() => {
    ;(() => {
      setIsLoading(true)

      Servives.getDetailsPost(id)
        .then((response) => {
          if (response?.status === 200) {
            setPost(response.data)
            setIsSuccess(true)
          } else {
            setIsError(true)
          }
          setIsLoading(false)
        })
        .catch(() => {
          setIsError(true)
          setIsLoading(false)
        })
    })()
  }, [id])

  useEffect(() => {
    const fetchDetailUser = (id) => {
      Servives.getDetailUser(id)
        .then((response) => {
          if (response?.status === 200) {
            const isExist = userList.find((item) => item.id === response?.data?.id)
            if (!isExist) setUserList((user) => [...user, response.data])

            setIsSuccess(true)
          } else {
            setIsSuccess(false)
          }
        })
        .catch(() => {
          setIsError(true)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }

    if (userIdList) {
      userIdList.forEach((userId) => {
        fetchDetailUser(userId)
        console.log(userList)
      })
    }
  }, [userIdList, userList])

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
        <div>
          <h2 className="font-medium text-lg">User seen:</h2>
          {userList.map((user) => (
            <p key={user.id}>{user?.name}</p>
          ))}
        </div>
      </div>
    )
  )
}
