import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className='mx-auto min-h-[70vh] max-w-3xl flex flex-col items-center justify-center px-6 text-center'>
      <h1 className='text-7xl font-bold text-blue-600'>
        404
      </h1>

      <h2 className='mt-4 text-3xl font-bold text-gray-900'>
        Page Not Found
      </h2>

      <p className='mt-4 text-gray-600'>
        Sorry, the page you're looking for doesn't exist or has been removed.
      </p>

      <Link
        to={'/'}
        className='mt-8 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700'
      >
        Back to Home
      </Link>
    </section>
  )
}

export default NotFound

