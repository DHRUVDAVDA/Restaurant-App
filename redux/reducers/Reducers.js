import { ADD_TO_CART, INCREMENT_COUNT, REMOVE_FROM_CART } from "../ActionTypes"

export const Reducers = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];

    case REMOVE_FROM_CART:
      const deleteArray = state.filter((item, index) => {
        return index !== action.payload;
      });
        return deleteArray;
     
    case INCREMENT_COUNT:
      let myIndex = -1;
     const updated = state.map((item,index)=>{
       if(item.id == action.payload){
        myIndex = index;
        state[myIndex].quantity=state[myIndex].quantity+1;
       }
      });
       return updated;

        default:
             return state;
    }
}
