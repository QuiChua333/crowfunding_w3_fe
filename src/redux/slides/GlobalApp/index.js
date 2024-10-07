
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    messageBox: {
        title: '',
        content: '',
        contentCancel: '',
        contentOK: '',
        result: null,
        type: '',
        isShow: false
    },
    previousLink: '',
    filterExplore: {

    }
}

const slice = createSlice({
    name: 'globalApp',
    initialState,
    reducers: {
        setLoading: (state,action) => {
            state.loading = action.payload;
        },
        setMessageBox: (state,action) => {
            state.messageBox = {
                ...state.messageBox,
                ...action.payload
            };
        },
        setPreviousLink: (state,action) => {
            state.previousLink = action.payload;
        },
        setFilterExplore: (state,action) => {
            state.filterExplore = {
                ...action.payload
            }
        }
    },
    
})

export default slice.reducer;
export const {setLoading, setMessageBox, setPreviousLink, setFilterExplore} = slice.actions