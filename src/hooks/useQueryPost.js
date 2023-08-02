import { useQuery } from '@tanstack/react-query'
import * as Services from '../services'

const fetchPost = async ({ queryKey }) => {
  return await Services.getDetailsPost(queryKey[1]).then((res) => res.data)
}

export default function useQueryPost({ id, ...rests }) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: fetchPost,
    ...rests,
  })
}
