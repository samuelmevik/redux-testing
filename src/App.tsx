import "./App.css";
import MovieInput from "./movie-components/MovieInput";
import MovieList from "./movie-components/MovieList";
import PostList from "./posts/PostList";

function App() {
  return (
    <>
      <MovieInput />
      <MovieList />
      <PostList />
    </>
  );
}

export default App;
