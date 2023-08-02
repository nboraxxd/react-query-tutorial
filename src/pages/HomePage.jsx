import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import * as Services from '../services'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

const HomePage = () => {
  const fetchAllPost = async ({ pageParam }) => {
    try {
      const response = await Services.getAllPosts(pageParam)
      return {
        data: response.data,
        currentPage: response.currentPage,
        totalPage: response.totalPage,
      }
    } catch (error) {
      console.log(error)
    }
  }

  const {
    data: listPost,
    isError,
    isLoading,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchAllPost,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => {
      console.log(lastPage)
      if (lastPage.currentPage >= lastPage.totalPage) return
      else return lastPage.currentPage + 1
    },
  })

  console.log(isFetchingNextPage)

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <h1>Error</h1>
  }

  return (
    <div>
      <h1>HomePage</h1>

      {isSuccess && (
        <div className="flex flex-col gap-1">
          {listPost?.pages?.map((posts) =>
            posts.data.map((post) => {
              return (
                <Link to={`/react-query/${post.id}`} className="post__name" key={post.id}>
                  {post.title}
                </Link>
              )
            })
          )}
          <button
            className={classNames(
              'w-36 rounded-lg bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 mx-auto px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-teal-500/50',
              {
                'hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-teal-300':
                  hasNextPage,
                'opacity-60': !hasNextPage,
              }
            )}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  )
}

export default HomePage
