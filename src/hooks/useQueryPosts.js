import { useQuery } from '@tanstack/react-query'
import * as Servives from '../services'

export default function useQueryPosts(rests) {
  const fetchPosts = async () => {
    const res = await Servives.getAllPosts()
    return res.data
  }

  console.log(rests)

  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    ...rests,
  })
}
