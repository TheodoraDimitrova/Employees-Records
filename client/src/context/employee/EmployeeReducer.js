import {
  ADD_EMPLOYEE,
  GET_EMPLOYEES,
  SET_CURRENT,
  CLEAR_CURRENT,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  CLEAR_FILTER,
  FILTER_EMPLOYEES,
  ADD_ERROR,
  CLEAR_EMPERRORS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload],
        current: action.payload,
        loading: false
      };
    case GET_EMPLOYEES:
      return {
        ...state,
        current: null,
        employees: action.payload,
        loading: false
      };
    case SET_CURRENT:
      return {
        ...state,
        current: [...state.employees].find(employee =>
          employee._id === action.payload ? employee : null
        ),
        loading:false
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
        loading:false
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          employee => employee._id !== action.payload
        ),
        loading: false
      };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employees:state.employees.map(employee =>
          employee._id === action.payload._id ? action.payload : employee
        ),
        loading: false
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
        loading:false
      };
    case FILTER_EMPLOYEES:
      return {
        ...state,
        filtered: state.employees.filter(employee => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return employee.name.match(regex) || employee.fd_number.match(regex) || employee.reg_number.match(regex) || employee.postcode.match(regex) ;
        }),
        loading:false
      };
    case ADD_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case CLEAR_EMPERRORS:
      return {
        ...state,
        error: null,
        loading:false
      };
    default:
      return state;
  }
};
