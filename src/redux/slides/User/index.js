
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: {}
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state,action) => {
            state.currentUser = {
                ...action.payload
            };
        },
    },
    
})

export default slice.reducer;
export const {setCurrentUser} = slice.actions