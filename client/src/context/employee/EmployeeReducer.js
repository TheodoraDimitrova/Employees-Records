import {
  ADD_EMPLOYEE,
  SET_CURRENT,
  CLEAR_CURRENT,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  CLEAR_FILTER,
  FILTER_EMPLOYEES
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload]
      };
    case SET_CURRENT:
      return {
        ...state,
        current: [...state.employees].find(employee =>
          employee.id === action.payload ? employee : null
        )
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          employee => employee.id !== action.payload
        )
      };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map(employee =>
          employee.id === action.payload.id ? action.payload : employee
        )
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case FILTER_EMPLOYEES:
      return {
        ...state,
        filtered: state.employees.filter(employee => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return employee.name.match(regex) || employee.email.match(regex);
        })
      };

    default:
      return state;
  }
};
