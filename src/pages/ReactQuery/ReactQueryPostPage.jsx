import { useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'
import useQueryPosts from '../../hooks/useQueryPosts'

const ReactQueryPostPage = () => {
  const [page, setPage] = useState(1)

  const {
    isError,
    isLoading,
    isSuccess,
    data: response,
  } = useQueryPosts({
    page,
    keepPreviousData: true,
    staleTime: 5000,
  })

  const { data: listPost } = response || {}

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <h1>Error</h1>
  }

  return (
    <div className="content">
      <h1>ReactQueryPostPage</h1>
      {isSuccess && (
        <>
          {listPost?.map((post) => {
            return (
              <Link to={`/react-query/${post.id}`} className="post__name" key={post.id}>
                {post.title}
              </Link>
            )
          })}
          <div className="flex gap-4">
            <button
              className="disabled:text-gray-300"
              onClick={() => page > 1 && setPage(page - 1)}
              disabled={page <= 1}
            >
              Prev
            </button>
            <p>{page}</p>
            <button
              className="disabled:text-gray-300"
              onClick={() => page < response?.totalPage && setPage(page + 1)}
              disabled={page >= response?.totalPage}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ReactQueryPostPage
