import { useQuery } from '@tanstack/react-query'
import * as Services from '../services'

export default function useQueryPosts(rests) {
  const fetchPosts = async () => {
    const res = await Services.getAllPosts()
    return res.data
  }

  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    ...rests,
  })
}
