import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {   
  const { id, title, body, tags } = blog;
  return (
    <article className='flex flex-col rounded-lg border border-gray-200 bg-white
      p-6 shadow-sm transition hover:shadow-md mt-6'>
        <div className='mb-4 flex flex-wrap gap-2'>
            {tags.map((tag) => (
                <span
                  key={tag}
                  className='rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600'
                >
                    #{tag}
                </span>
            ))}
        </div>

        <h2 className='mb-3 text-2xl font-semibold text-gray-900'>
            {title}
        </h2>

        <p className='mb-6 line-clamp-3 text-gray-600'>
            {body}
        </p>

        <Link
          to={`/blogs/${id}`}
          className='mt-auto font-medium text-blue-600 hover:underline'
        >
          Read More
        </Link>
    </article>
  )
}

BlogCard.propTypes = {
    blog: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
};

export default BlogCard