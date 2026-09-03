import PropTypes from 'prop-types'

const FormInputs =
 ({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    error,
 }) => {
  return (
    <div>
        <label
          htmlFor={name}
          className='mb-2 font-medium text-gray-700'
        >
            {label}
        </label>

        <input 
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
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
};

FormInputs.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
};

export default FormInputs;