import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_BUN,
  SET_COUNT,
  OPEN_INGREDIENT_DETAILS,
  INCREASE_COUNTER,
  DECREASE_COUNTER
} from '../actions/menu';

const initialState = {
  selectedBunId: undefined,
  items: [],
  menuRequest: false,
  menuFailed: false,
  ingredientDetailsModal: {}
};

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        menuRequest: true
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        menuRequest: false,
        items: action.items
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        menuRequest: false,
        menuFailed: true
      }
    }
    case SET_BUN: {
      return {
        ...state,
        selectedBunId:
          action.ingredientType === "bun" ? action.id : state.selectedBunId
      }
    }
    case SET_COUNT: {
      return {
        ...state,
        ...action.items.forEach((item) => (item.count = 0)),
      }
    }
    case OPEN_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetailsModal: action.ingredient
      }
    }
    case INCREASE_COUNTER: {
      return {
        ...state,
        ...action.items.find((item) =>
          item._id === action.id ? (item.count ++) : null
        )
      }
    }
    case DECREASE_COUNTER: {
      return {
        ...state,
        ...action.items.find((item) =>
          item._id === action.id ? (item.count --) : null
        )
      }
    }
    default: {
      return state;
    }
  }
}
