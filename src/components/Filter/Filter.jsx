import { StyledFilter } from './StyledFilter';
import PropTypes from 'prop-types';

export const Filter = ({ handleOnFindInputChange, value }) => {
  return (
    <StyledFilter>
      <label htmlFor="find">Find contacts by name</label>
      <input
        type="text"
        name="find"
        id="find"
        value={value}
        onChange={handleOnFindInputChange}
      />
    </StyledFilter>
  );
};

Filter.propTypes = {
  handleOnFindInputChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
