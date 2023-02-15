import { ADD_TO_CART, REMOVE_FROM_CART } from "../ActionTypes";

export const addItemToCart = data => ({
    type: ADD_TO_CART,
    payload: data,
});

export const removeItemFromCart = index => ({
    type: REMOVE_FROM_CART,
    payload: index,
});