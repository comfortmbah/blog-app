import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section className='max-w-7xl mx-auto px-6 py-12'>
      <div className='space-y-6 text-center'>
        <h1 className='text-4xl font-bold text-gray-900 md:text-5xl'>
          Welcome to BlogApp
        </h1>

        <p className='mx-auto max-w-2xl text-lg text-gray-600'>
          Discover insightful articles on web develpment, programming, technology and more.
        </p>

        <Link
          to={'/blogs'}
          className='inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700'
        > 
          Explore Blogs
        </Link>
      </div>

      <section className='mt-20'>
        <h2 className='mb-6 text-3xl font-bold text-gray-900'>
          Featured Posts
        </h2>

        <p className='text-gray-600'>
          Featured blog posts will appear here.
        </p>
      </section>

      <section className='mt-20'>
        <h2 className='mb-6 text-3xl font-bold text-gray-900'>
          Latest Posts
        </h2>

        <p className='text-gray-600'>
          The latest blog posts will appear here.
        </p>
      </section>
    </section>
  )
};

export default Home