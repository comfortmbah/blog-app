import PropTypes from 'prop-types'

const Error = ({ message }) => {
  return (
    <div className="rounded-lg border border-red-200 bg-red-100  px-4 py-3 text-red-700">
        <p>
            {message}
        </p>
    </div>
  )
};

Error.propTypes = {
    message: PropTypes.string.isRequired,
};

export default Error