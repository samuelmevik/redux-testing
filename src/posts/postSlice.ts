import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as yup from "yup";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const postSchema = yup.object().shape({
  userId: yup.number().required("userId is required"),
  id: yup.number().required("id is required"),
  title: yup.string().required("title is required"),
  body: yup.string().required("body is required"),
});

type yupPost = yup.InferType<typeof postSchema>;

const postsSchema = yup.array().of(postSchema).required();

type Post = yupPost & {
  date: number;
};

export type State = {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: State = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk<
  yupPost[],
  void,
  { rejectValue: string }
>("posts/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(POSTS_URL);
    return await postsSchema.validate(response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue(String(error));
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: (state, action: PayloadAction<Post>) => {
      state.posts = [...state.posts, action.payload];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedPosts = action.payload.map((post) => ({
          ...post,
          date: Date.now(),
        }));
        state.posts = [...state.posts, ...loadedPosts];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch posts";
      });
  },
});
export const { postAdded } = postSlice.actions;
export default postSlice.reducer;
