import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useAppSelector } from "../store";
import { Fragment, useEffect } from "react";
import { addNewPost, fetchPosts } from "./postSlice";

const PostList = () => {
  const { posts, status, error, isFetching } = useAppSelector((state) => state.posts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  const handleSubmit = () => {
    dispatch(addNewPost({id: 432, userId: 423789, title: "jfds", body: "FKASD"}))
  }

  return (
    <div>
      {status === "loading" && <p>loading</p>}
      {error && <p>{error}</p>}
      {isFetching && <p>{"fetching"}</p>} 
      <button onClick={handleSubmit}>farads</button>
      {posts.map((post, i) => (
        <Fragment key={i}>
          <div>{post.body}</div>
        </Fragment>
      ))}
     
    </div>
  );
};

export default PostList;
