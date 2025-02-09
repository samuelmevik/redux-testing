import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movie-components/movieSlice";
import postReducer from "./posts/postSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        movies: movieReducer,
        posts: postReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;