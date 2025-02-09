import { useDispatch } from "react-redux";
import { removeMovie } from "./movieSlice";
import { useAppSelector } from "../store";
import { Fragment } from "react";

const MovieList = () => {
  const movies = useAppSelector((state) => state.movies.movies);
  const dispatch = useDispatch();

  const deleteMovie = (id: number) => {
    dispatch(removeMovie(id));
  };

  return (
    <div>
      {movies.map((movie) => (
        <Fragment key={movie.id}>
          <div>{movie.name}</div>
          <button onClick={() => void deleteMovie(movie.id)}>
            Delete Movie
          </button>
        </Fragment>
      ))}
    </div>
  );
};

export default MovieList;
