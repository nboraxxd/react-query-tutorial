import { useQuery } from '@tanstack/react-query'
import Loading from '../components/Loading'
import * as Servives from '../services'

const initialData = [
  {
    userId: 1,
    id: 1,
    title: 'Ai biet gi daoo',
    body: 'Anh cung hong bet nuaaa',
  },
  {
    userId: 1,
    id: 2,
    title: 'Ngoi khong thi cung chan',
    body: 'Ma hoc bai thi luoii',
  },
]

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
    initialData,
  })

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
            {post.title}
          </div>
        )
      })}
    </div>
  )
}

export default ReactQueryPostPage
