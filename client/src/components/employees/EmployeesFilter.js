import React, { useContext, useState } from 'react';
import EmployeeContext from '../../context/employee/EmployeeContext';

const EmployeesFilter = () => {
  const employeeContext = useContext(EmployeeContext);
  const { filterEmployees, clearFilter, filtered } = employeeContext;

  const [text, setText] = useState('');
  const clear = () => {
    clearFilter();
    setText('');
  };
  const onSubmit = e => {
    e.preventDefault();
    filterEmployees(text);
  };
  const onChange = e => {
    setText(e.target.value);
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Filter by name or email"
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {filtered !== null && (
        <button className="btn btn-light btn-block" onClick={clear}>
          Clear Filter
        </button>
      )}
    </div>
  );
};
export default EmployeesFilter;
