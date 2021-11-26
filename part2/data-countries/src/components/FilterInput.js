import React from "react";
const FilterInput = ({keyword, action}) => {
  return (
    <div>
      <p>Find countries</p>
      <input type="text" name={keyword} onChange={action} />
    </div>
  );
};
export default FilterInput;