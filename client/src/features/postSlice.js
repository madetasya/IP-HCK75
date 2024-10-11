import { createSlice } from "@reduxjs/toolkit";
import { axiosIns } from "../axios";

export const postSlice = createSlice({
    name: "post",
    initialState: {
        data: [],
    },
    reducers: {
        setPost: (state, action) => {
            state.data= action.payload;
        },
    
    },
});

export const { setPost } = postSlice.actions;

export const fetchPosts = () => {
    return async (dispatch) => {
        const { data } = await axiosIns.get('/article');
        console.log(data, "=========meh");

        dispatch(setPost(data));
    };
};
export default postSlice.reducer;