import PropTypes from "prop-types"

const Alert = ({ type = "success", message}) => {

    if (!message) return null;

    const alertStyles = {
        success: "border-green-200 bg-green-100 text-green-700",
        error: "border-red-200 bg-red-100 text-red-700",
    };


  return (
    <div
      className={`mb-6 rounded-lg border px-4 py-3 ${alertStyles[type]}`}
    >
        <p>
            {message}
        </p>
    </div>
  )
}

Alert.PropTypes = {
    type: PropTypes.oneOf(['success', 'error']),
    message: PropTypes.string,
};

export default Alert