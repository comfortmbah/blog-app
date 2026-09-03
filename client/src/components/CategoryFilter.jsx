import PropTypes from 'prop-types'
import SelectInput from './SelectInput'


const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {

  const options = [
    { value: "All", label: "All Categories" },
    ...categories.map((category) => ({
        value: category,
        label: category,
    })),
  ];

  return (
    <SelectInput
      label={'Filter by Category'}
      name={'category'}
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
      options={options}
    />
  )
}

CategoryFilter.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedCategory: PropTypes.string.isRequired,
    onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryFilter