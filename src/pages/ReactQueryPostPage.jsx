import Loading from '../components/Loading'
import useQueryPosts from '../hooks/useQueryPosts'

const ReactQueryPostPage = () => {
  const {
    isError,
    isLoading,
    data: listPost,
  } = useQueryPosts({
    select: (data) => data.map((item) => ({ ...item, name: item.title })),
    staleTime: 2000,
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <h1>Error</h1>
  }

  console.log(listPost)

  return (
    <div className="content">
      <h1>ReactQueryPostPage</h1>
      {listPost.map((post) => {
        return (
          <div className="post__name" key={post.id}>
            {post.name}
          </div>
        )
      })}
    </div>
  )
}

export default ReactQueryPostPage
