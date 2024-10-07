
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    payment: {
        total: 0,
        listPerkPayment: []
    }
}

const slice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setPayment: (state,action) => {
            state.payment = {...action.payload}
        },
        
    },
    
})

export default slice.reducer;
export const {setPayment} = slice.actions