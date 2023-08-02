import React, { useEffect, useState } from 'react'
import * as Servives from '../../services/index'
import Loading from '../../components/Loading'
import { Link } from 'react-router-dom'

const ReactPostPage = () => {
  const [listPost, setListPost] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(null)

  const fetchAllPost = async (page) => {
    setIsLoading(true)
    try {
      Servives.getAllPosts(page).then((res) => {
        if (res?.status === 200) {
          setListPost(res.data)
          setTotalPage(res.totalPage)
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
  }

  useEffect(() => {
    fetchAllPost(page)
  }, [page])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <h1>Error</h1>
  }

  return (
    <div className="content">
      <h1>ReactPostPage</h1>
      {isSuccess && (
        <>
          {listPost?.map((post) => {
            return (
              <Link to={`/react/${post.id}`} className="post__name" key={post.id}>
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
              onClick={() => page < totalPage && setPage(page + 1)}
              disabled={page >= totalPage}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ReactPostPage
