import { createSlice } from '@reduxjs/toolkit'

const myFoodSlice = createSlice({
    name: 'food',
    initialState: [],
    reducers: {
        addMyFood(state, action) {
            let myIndex = -1;
            state.map((item, index) => {
                if (item.name == action.payload.name) {
                    myIndex = index;
                }
            });
            if (myIndex == -1) {
                state.push(action.payload);
            }
            else {
                state[myIndex].quantity = action.payload.quantity++;
            }
        },
        deleteMyFood(state, action) {
            const deletedArray = state.filter((item, index) => {
                return index !== action.payload;
            })
            return deletedArray;
        },
        incrementQty(state, action) {
            let myIndex = -1;
            state.map((item, index) => {
                if (item.id == action.payload) {
                    myIndex = index;
                }
            });
            if (myIndex == -1) {
            }
            else {
                state[myIndex].quantity = state[myIndex].quantity + 1;
            }
        },
        decrementQty(state, action) {
            let myIndex = -1;
            state.map((item, index) => {
                if (item.id == action.payload) {
                    myIndex = index;
                }
            });
            if (myIndex == -1) {
            }
            else {
                state[myIndex].quantity = state[myIndex].quantity - 1;
            }
        }
    },
});

export const { addMyFood, deleteMyFood, incrementQty, decrementQty } = myFoodSlice.actions;
export default myFoodSlice.reducer;