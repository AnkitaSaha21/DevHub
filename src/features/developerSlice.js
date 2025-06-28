import { createSlice } from "@reduxjs/toolkit";

const developerSlice = createSlice({
    name: "developers",
    initialState: localStorage.getItem("developers") ? JSON.parse(localStorage.getItem("developers")) : [],
    reducers: {
        addDevelopers: (state, action) => {
           state.push(action.payload);
           localStorage.setItem("developers", JSON.stringify(state));
        },
    }

})

export const { addDevelopers } = developerSlice.actions;
export default developerSlice.reducer;