import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

const Select = ({ onChange, options, defaultValue, placeholder }) => {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (selected) => {
    onChange(selected.slug);
    setValue(selected);
  };

  return (
    <div className="select__item">
      <div className="select__item__label">{ placeholder }</div>
      <ReactSelect
        value={value}
        options={options}
        getOptionalLabel={(option) => option.label}
        getOptionValue={(option) => option.id}
        onChange={handleChange}
      />
    </div>
  );
};

const optionShape = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
  slug: PropTypes.string,
};
Select.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape(optionShape)).isRequired,
  defaultValue: PropTypes.shape(optionShape).isRequired,
};
export default Select;
