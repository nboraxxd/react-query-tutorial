import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading'
import useQueryPosts from '../../hooks/useQueryPosts'

const ReactQueryPostPage = () => {
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

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

  const handlePrevBtn = () => {
    page > 1 && setPage(page - 1)
    navigate(`/react-query?page=${page - 1}`)
  }

  const handleNextBtn = () => {
    page < response?.totalPage && setPage(page + 1)
    navigate(`/react-query?page=${page + 1}`)
  }

  if (isLoading) return <Loading />
  if (isError) return <h1>Error</h1>

  return (
    <div className="content">
      <h1>ReactQueryPostPage</h1>
      {isSuccess && (
        <>
          {listPost?.map((post) => {
            return (
              <Link
                to={`/react-query/${post.id}`}
                state={[2, 4]}
                className="post__name"
                key={post.id}
              >
                {post.title}
              </Link>
            )
          })}
          <div className="flex gap-4">
            <button className="disabled:text-gray-300" onClick={handlePrevBtn} disabled={page <= 1}>
              Prev
            </button>
            <p>{page}</p>
            <button
              className="disabled:text-gray-300"
              onClick={handleNextBtn}
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
