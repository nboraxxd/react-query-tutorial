import { useQuery } from '@tanstack/react-query'
import Loading from '../components/Loading'
import * as Servives from '../services'

const ReactQueryPostPage = () => {
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
    select: (data) => {
      return data.map((item) => ({ ...item, name: item.title }))
    },
  })

  console.log(listPost)

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <h1>Error</h1>
  }

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
