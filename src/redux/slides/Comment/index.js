
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    
}

const slice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        createComment: (state,action) => {
            state.loading = action.payload;
        },
        
    },
    
})

export default slice.reducer;
export const {} = slice.actions