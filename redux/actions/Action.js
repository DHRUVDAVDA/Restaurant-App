import { ADD_TO_CART, DECREMENT_COUNT, INCREMENT_COUNT, REMOVE_FROM_CART } from "../ActionTypes";

export const addItemToCart = data => ({
    type: ADD_TO_CART,
    payload: data,
});

export const removeItemFromCart = index => ({
    type: REMOVE_FROM_CART,
    payload: index,
});

export const incrementCount = data => ({
    type: INCREMENT_COUNT,
    payload: data,
})

export const decrementCount = data => ({
    type :DECREMENT_COUNT,
    payload: data,
})