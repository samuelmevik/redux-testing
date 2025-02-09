import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./components/movieSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        movies: movieReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;