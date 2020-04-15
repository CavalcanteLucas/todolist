import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_REGISTER_SUCCESS_MESSAGE,
  CLEAR_REGISTER_ERROR_MESSAGE
} from "./actions";

const initialState = {
  isLoading: false,
  token: localStorage.getItem("token"),
  successMessage: null,
  errors: null
};

export default function todoAuthReducers(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        successMessage: initialState.successMessage,
        errors: initialState.errors
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.response.data.token);
      return {
        ...state,
        isLoading: false,
        successMessage: "User successfully created!"
      };
    case REGISTER_FAILURE:
      localStorage.removeItem("token");
      // console.log(action.response.data);
      return {
        ...state,
        token: null,
        isLoading: false,
        errors: action.response.data
      };
    case CLEAR_REGISTER_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: initialState.successMessage
      };
    case CLEAR_REGISTER_ERROR_MESSAGE:
      return {
        ...state,
        errors: initialState.errors
      };
    default:
      return state;
  }
}
