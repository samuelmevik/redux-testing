import { createSlice, PayloadAction, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import * as yup from 'yup'


const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const postSchema = yup.object().shape({
  userId: yup.number().required("userId is required"),
  id: yup.number().required("id is required"),
  title: yup.string().required("title is required"),
  body: yup.string().required("body is required"),
});

type yupPost = yup.InferType<typeof postSchema>

const postsSchema = yup.array().of(postSchema);

type yupPosts = yup.InferType<typeof postsSchema>


type Post = yupPost & {
    date: Date
}

export type State = {
    posts: Post[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: unknown | null | undefined,
}

const initialState : State = {
    posts: [],
    status: 'idle',
    error: ""
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(POSTS_URL)
        return postsSchema.validate(response.data)
    } catch (error) {
        console.log(error)
    }
})

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: (state, action : PayloadAction<Post>) => {
            state.posts = [...state.posts, action.payload]
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchPosts.pending, (state, action) => {
          state.status = "loading";
        }).addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            const loadedPosts = action.payload?.map
        });
    },
})
export const { postAdded } = postSlice.actions
export default postSlice.reducer