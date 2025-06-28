import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: "blogs",
    initialState: localStorage.getItem("blogs") ? JSON.parse(localStorage.getItem("blogs")) : [],
    reducers: {
        addBlog: (state, action) => {
            state.push(action.payload);
            localStorage.setItem("blogs", JSON.stringify(state));
        },
        updateBlog: (state, action) => {
            const index = state.findIndex(blog => blog.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
                localStorage.setItem("blogs", JSON.stringify(state));
            }
        },
        deleteBlog: (state, action) => {
            const newState = state.filter(blog => blog.id !== action.payload);
            localStorage.setItem("blogs", JSON.stringify(newState));
            return newState;
        }
    }
})

export const { addBlog, updateBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;