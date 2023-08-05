import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import useQueryPost from '../../hooks/useQueryPost'
import { useQueries, useQueryClient } from '@tanstack/react-query'
import * as Services from '../../services'

export default function ReactQueryPostDetail() {
  const { id } = useParams()
  const { state: userIdList } = useLocation()

  const fetchDetailUser = async (id) => {
    const res = await Services.getDetailUser(id)
    return res.data
  }

  const queryClient = useQueryClient()

  const {
    data: post,
    isLoading,
    isError,
    isSuccess,
  } = useQueryPost({
    id,
    staleTime: 2000,
    initialData: () => {
      return queryClient
        .getQueryData(['posts'], { exact: false })
        ?.data?.find((item) => Number(item?.id) === Number(id))
    },
  })

  const queries = useQueries({
    queries: userIdList.map((userId) => ({
      queryKey: ['user', userId],
      queryFn: () => fetchDetailUser(userId),
      staleTime: 5000,
    })),
  })

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
          {queries.map((user, index) => (
            <p key={index}>{user?.data?.name}</p>
          ))}
        </div>
      </div>
    )
  )
}
