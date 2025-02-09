import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useAppSelector } from "../store";
import { Fragment, useEffect } from "react";
import { fetchPosts } from "./postSlice";

const PostList = () => {
  const { posts, status, error } = useAppSelector((state) => state.posts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === 'idle') {
        dispatch(fetchPosts())
    }
  }, [dispatch, status])


  return (
    <div>
        {status === 'loading' && <p>
            loading
        </p>}
        {error && <p>{error}</p>}
      {posts.map((post, i) => (
        <Fragment key={i}>
          <div>{post.body}</div>
        </Fragment>
      ))}
    </div>
  );
};

export default PostList;
