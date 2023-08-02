import { useQuery } from '@tanstack/react-query'
import * as Services from '../services'

const fetchPosts = async (page) => {
  const res = await Services.getAllPosts(page)
  return res
}
export default function useQueryPosts({ page, ...rests }) {
  return useQuery({
    queryKey: ['posts', page],
    queryFn: () => fetchPosts(page),
    ...rests,
  })
}
