import axios from "axios";
import { Dispatch } from "redux";
import { 
  IProduct,
   ITodo } from "./reducer";
import { AppState } from "./store";
import { v4 as uuidv4 } from "uuid";

export const PRODUCT_LIST_REQ = "PRODUCT_LIST_REQ";
export const PRODUCT_LIST_SUCC = "PRODUCT_LIST_SUCC";
export const PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL";

export type productsListActions =
  | { type: typeof PRODUCT_LIST_REQ }
  | { type: typeof PRODUCT_LIST_SUCC; payload: IProduct[] }
  | { type: typeof PRODUCT_LIST_FAIL; payload: unknown };

export const getProducts = () => async (dispatch: Dispatch<productsListActions>) => {
  dispatch({ type: PRODUCT_LIST_REQ });
  try {
    const { data } = await axios.get("https://nsr-shop.herokuapp.com/api/products");
    dispatch({ type: PRODUCT_LIST_SUCC, payload: data.all });
  } catch (err) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: err });
    console.log(err);
  }
};

export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DEL_TODO = "DEL_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

export type todoActions =
  | { type: typeof ADD_TODO; payload: ITodo }
  | { type: typeof UPDATE_TODO }
  | { type: typeof DEL_TODO; payload: ITodo[] }
  | { type: typeof TOGGLE_TODO };

export const addTodo = (task: string) => (dispatch: Dispatch<todoActions>) => {
  const newTodo: ITodo = { task, id: uuidv4(), done: false };
  dispatch({ type: ADD_TODO, payload: newTodo });
};

export const updateTodo =
  (id: string, newTask: string) => (dispatch: Dispatch<todoActions>, getState: () => AppState) => {
    const selectedTodo = getState().todos.find((todo) => todo.id === id);
    if (selectedTodo) {
      selectedTodo.task = newTask;
    }
    dispatch({ type: UPDATE_TODO });
  };

export const toggleTodo = (id: string) => (dispatch: Dispatch<todoActions>, getState: () => AppState) => {
  const selectedTodo = getState().todos.find((todo) => todo.id === id);
  if (selectedTodo) {
    selectedTodo.done = !selectedTodo.done;
  }
  dispatch({ type: TOGGLE_TODO });
};

export const deleteTodo = (id: string) => (dispatch: Dispatch<todoActions>, getState: () => AppState) => {
  const newList = getState().todos.filter((todo) => todo.id !== id);
  dispatch({ type: DEL_TODO, payload: newList });
};
