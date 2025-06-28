import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name: "comments",
    initialState: localStorage.getItem("comments") ? JSON.parse(localStorage.getItem("comments")) : [],
    reducers: {
        addComment: (state, action) => {
            state.push(action.payload);
            localStorage.setItem("comments", JSON.stringify(state));
        },
        updateComment: (state, action) => {
            const index = state.findIndex(comment => comment.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
                localStorage.setItem("comments", JSON.stringify(state));
            }
        },
        deleteComment: (state, action) => {
            const newState = state.filter(comment => comment.id !== action.payload);
            localStorage.setItem("comments", JSON.stringify(newState));
            return newState;
        }
    }
})
export const { addComment, updateComment, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;