
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    title: '',
    tagline: '',
    cardImage: '',
    location: {
        country: '',
        city: '',
    },
    category: '',
    field: '',
    status: '',
    startDate: null,
    duration: 0,
    videoUrl: '',
    imageDetailPage: '',
    story: '',
    goal: 0,
    momoNumber: '',
    faqs: [],
    owner: '',
    team: []
}

const slice = createSlice({
    name: 'userCampaign',
    initialState,
    reducers: {
        
    },
    
})

export default slice.reducer;
export const {} = slice.actions