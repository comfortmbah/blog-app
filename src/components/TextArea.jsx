import PropTypes from 'prop-types'

const TextArea = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    rows = 6,
    error,
}) => {
  return (
    <div>
        <label
          htmlFor={name}
          className='mb-2 block font-medium text-gray-700'
        >
          {label}
        </label>

        <textarea 
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`w-full rounded-lg border px-4 py-3 focus:outline-none ${ error ? "border-red-500 focus:border-red-500"
            : "border-b-gray-300 focus:border-blue-600"
          }`}
        />

        {error && (
            <p className='mt-1 text-sm text-red-600'>
                {error}
            </p>
        )}
    </div>
  )
}

TextArea.PropTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    error: PropTypes.string,
};

export default TextArea