import PropTypes from 'prop-types'

const SelectInput = ({
    label,
    name,
    value,
    onChange,
    options,
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

        <select 
          id={name} 
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full rounded-lg border px-4 py-3 focus:outline-none ${error ?
            "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-600"
          }`}  
         >

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
        </select>

        {error && (
          <p className='mt-1 text-sm text-red-600'>
            {error}
          </p>
        )}
    </div>
  )
}

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  error: PropTypes.string,
}

export default SelectInput