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
    retry: 2,
    onSuccess: () => {
      console.log('thanh cong rui ban oi')
    },
    onError: () => {
      console.log('that bai rui huhu')
    },
    onSettled: () => {
      console.log('du sao thi cung phai move on ban nhe')
    }
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
