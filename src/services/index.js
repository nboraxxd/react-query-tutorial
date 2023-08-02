import axios from 'axios'

const getAllPosts = async (page = 1, limit = 3) => {
  try {
    const res = await axios.get(`http://localhost:3001/posts?_page=${page}&_limit=${limit}`)
    const resTotal = 14
    return {
      status: res?.status,
      statusText: res.statusText,
      data: res?.data?.map((post) => {
        return {
          ...post,
          body: post?.body?.substring(0, 50) + (post?.body?.length > 50 ? '...' : ''),
        }
      }),
      currentPage: page,
      totalPage: Math.ceil(resTotal / limit),
    }
  } catch (error) {
    console.log(error)
  }
}

const getDetailsPost = async (idPost) => {
  const res = await axios.get(`http://localhost:3001/posts/${idPost}`)
  return {
    status: res?.status,
    statusText: res.statusText,
    data: res?.data,
  }
}

const deletePost = async (idPost) => {
  const res = await axios.delete(`http://localhost:3001/posts/${idPost}`)
  return {
    status: res?.status,
    statusText: res.statusText,
  }
}

const updatePost = async (idPost, data) => {
  const res = await axios.patch(`http://localhost:3001/posts/${idPost}`, data)
  return {
    status: res?.status,
    statusText: res.statusText,
    data: res?.data,
  }
}

export { getAllPosts, getDetailsPost, deletePost, updatePost }
