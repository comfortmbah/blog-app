import PropTypes from "prop-types"

const EmptyState = ({ title, message }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 px-6 py-12 text-center">
        <h2 className="mb-2 text-2xl font-semibold text-gray-600">
            {title}
        </h2>

        <p className="text-gray-600">
            {message}
        </p>
    </div>
  )
}

EmptyState.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

export default EmptyState;