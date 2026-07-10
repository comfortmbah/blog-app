import { useParams } from 'react-router-dom'

const BlogDetails = () => {
  const { id } = useParams();

  return (
    <section className='mx-auto max-w-4xl px-6 py-12'>
      <p className='mb-4 text-sm font-medium text-blue-600'>
        Blog ID: {id}
      </p>

      <h1 className='mb-4 text-4xl font-bold text-gray-900'>
        Blog Title
      </h1>

      <div className='mb-8 flex flex-wrap gap-4 text-sm text-gray-600'>
        <span>Author: John Doe</span>
        <span>Category: Technology</span>
        <span>Published: November, 2025</span>
      </div>

      <article className='space-y-4 leading-8 text-gray-700'>
        <p>
          The complete blog content will be displayed here after we connect this page to our API.
        </p>

        <p>
          Later, we'll fetch the selected blog using the ID from the URL and render the full article dynamically.
        </p>
      </article>
    </section>
  )
}

export default BlogDetails