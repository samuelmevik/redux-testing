import { useState } from "react";
import { addMovie } from "./movieSlice";
import { useDispatch } from "react-redux";

const MovieInput = () => {
  const [movie, setMovie] = useState<string>("");
  const dispatch = useDispatch();

  const handleAddMovie = () => {
    if (!movie) {
      return;
    }
    dispatch(addMovie(movie));
  };

  return (
    <div>
      <input
        onChange={(e) => void setMovie(e.target.value)}
        type="text"
        placeholder="Enter movie name"
      />
      <button onClick={handleAddMovie}>Add movie</button>
    </div>
  );
};

export default MovieInput;
