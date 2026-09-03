import { useParams } from 'react-router-dom'
import Error from '../components/Error';
import Loader from '../components/Loader';
import useFetch from '../hooks/useFetch';

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, loading, error } = useFetch(`https://dummyjson.com/posts/${id}`);

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error />
  }

  return (
    <section className='mx-auto max-w-4xl px-6 py-12'>
      <div className='mb-4 flex flex-wrap gap-2'>
        {blog.tags.map((tag) => (
          <span
            key={tag}
            className='rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600'
          >
            #{tag}
          </span>
        ))}
      </div>

      <h1 className='mb-6 text-4xl font-bold text-gray-900'>
        {blog.title}
      </h1>

      <article className='space-y-6'>
        <p>
          {blog.body}
        </p>
      </article>
    </section>
  )
}

export default BlogDetails