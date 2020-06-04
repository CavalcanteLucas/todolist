import {
  GET_TODO_LISTS_REQUEST,
  GET_TODO_LISTS_SUCCESS,
  GET_TODO_LISTS_FAILURE,
  GET_TODO_LIST_REQUEST,
  GET_TODO_LIST_SUCCESS,
  GET_TODO_LIST_FAILURE,
  CREATE_TODO_LIST_REQUEST,
  CREATE_TODO_LIST_SUCCESS,
  CREATE_TODO_LIST_FAILURE,
  CLEAR_CREATE_TODO_LIST_ERRORS,
  CLEAR_CREATE_TODO_LIST_SUCCESS_MESSAGE
} from "./actions";
import { LOGOUT_SUCCESS } from "../auth/actions";

const initialState = {
  todoLists: null,
  getTodoListsIsLoading: false,
  getTodoListsFailureMessage: null,
  createTodoListIsLoading: false,
  createTodoListSuccessMessage: null,
  createTodoListErrors: null,
  todoListDetail: null,
  getTodoListIsLoading: false,
  getTodoListFailureMessage: null,
};

export function todoReducers(state = initialState, action) {
  switch (action.type) {
    // GET_TODO_LISTS
    case GET_TODO_LISTS_REQUEST:
      return {
        ...state,
        getTodoListsIsLoading: true,
        getTodoListsFailureMessage: initialState.getTodoListsFailureMessage,
        todoLists: initialState.todoLists
      };
    case GET_TODO_LISTS_SUCCESS:
      return {
        ...state,
        getTodoListsIsLoading: initialState.getTodoListsIsLoading,
        todoLists: action.response.data
      };
    case GET_TODO_LISTS_FAILURE:
      return {
        ...state,
        getTodoListsIsLoading: initialState.getTodoListsIsLoading,
        getTodoListsFailureMessage:
          "Opsy.. Something went wrong. We couldn't retrieve your To-Do lists from the database!"
      };

    // GET_TODO_LIST
    case GET_TODO_LIST_REQUEST:
      return {
        ...state,
        getTodoListIsLoading: true,
        getTodoListFailureMessage: initialState.getTodoListFailureMessage,
        todoListDetail: initialState.todoListDetail
      };
    case GET_TODO_LIST_SUCCESS:
      return {
        ...state,
        getTodoListIsLoading: initialState.getTodoListIsLoading,
        todoListDetail: action.response.data
      };
    case GET_TODO_LIST_FAILURE:
      return {
        ...state,
        getTodoListIsLoading: initialState.getTodoListIsLoading,
        getTodoListFailureMessage:
          "Opsy.. Something went wrong. We couldn't retrieve the selected To-Do List from the database!"
      };

    // CREATE_TODO_LIST
    case CREATE_TODO_LIST_REQUEST:
      return {
        ...state,
        createTodoListIsLoading: true,
        createTodoListSuccessMessage: initialState.createTodoListSuccessMessage,
        createTodoListErrors: initialState.createTodoListErrors
      };
    case CREATE_TODO_LIST_SUCCESS:
      return {
        ...state,
        todoLists: [action.response.data, ...state.todoLists],
        createTodoListIsLoading: initialState.createTodoListIsLoading,
        createTodoListSuccessMessage: "Todo List created successfully."
      };
    case CREATE_TODO_LIST_FAILURE:
      return {
        ...state,
        createTodoListIsLoading: initialState.createTodoListIsLoading,
        createTodoListErrors: action.response.data
      };

    // CLEAR
    case CLEAR_CREATE_TODO_LIST_ERRORS:
      return {
        ...state,
        createTodoListErrors: initialState.createTodoListErrors
      };
    case CLEAR_CREATE_TODO_LIST_SUCCESS_MESSAGE:
      return {
        ...state,
        createTodoListSuccessMessage: initialState.createTodoListSuccessMessage
      };

    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
}
