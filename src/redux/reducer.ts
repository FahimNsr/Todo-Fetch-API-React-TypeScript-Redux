import { combineReducers } from "redux";
import {
  productsListActions,
  PRODUCT_LIST_REQ,
  PRODUCT_LIST_SUCC,
  PRODUCT_LIST_FAIL,
  todoActions,
  ADD_TODO,
  UPDATE_TODO,
  DEL_TODO,
  TOGGLE_TODO,
} from "./action";

export interface IProduct {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  descreption: string;
  imageName: string;
  seller: {};
  createdAt: string;
  updatedAt: string;
}

export interface productsListState {
  loading: boolean;
  productsList?: IProduct[];
  err?: string;
}

const productsListReducer = (state: productsListState = { loading: true }, action: productsListActions) => {
  switch (action.type) {
    case PRODUCT_LIST_REQ:
      return { loading: true };
    case PRODUCT_LIST_SUCC:
      return { loading: false, productsList: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, err: action.payload };
    default:
      return state;
  }
};

export interface ITodo {
  task: string;
  id: string;
  done: boolean;
}

const todoReducer = (state: ITodo[] = [], action: todoActions) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case UPDATE_TODO:
      return [...state];
    case DEL_TODO:
      return action.payload;
    case TOGGLE_TODO:
      return [...state];
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  productsList: productsListReducer,
  todos: todoReducer,
});
