import PropTypes from "prop-types"
import FormInputs from '../components/FormInputs'

const SearchBar = ({ searchItem, onSearch }) => {
  return (
    <div className="mb-8">
        <FormInputs 
          label={'Search Blogs'}
          type="text"
          name={'search'}
          value={searchItem}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={'Search blogs...'}
        />
    </div>
  )
}

SearchBar.propTypes = {
    searchItem: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar