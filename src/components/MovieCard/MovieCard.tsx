import { Message, useToaster } from "rsuite";
import { Movie, useDataService } from "../../services/DataService";
import { MovieCardDropdown } from "../MovieCardDropdown";
import "./styles.css";

interface Props {
  movie: Movie;
  onClick: (movieId: number) => void;
  onActionSuccess: () => void;
}

export const MovieCard = ({ movie, onClick, onActionSuccess }: Props) => {
  const { removeMovie, setEditedMovie } = useDataService();
  const toaster = useToaster();

  const editMovieAction = () => {
    setEditedMovie(movie);
  };

  const removeMovieAction = () => {
    removeMovie(movie).then(() => {
      toaster.push(
        <Message type="success">Movie {movie.title} removed</Message>
      );
      onActionSuccess();
    });
  };

  const open = (e) => {
    if (
      ["BUTTON", "LI", "PATH", "SVG"].includes(e.target.nodeName.toUpperCase())
    )
      return;
    onClick(movie.id);
  };

  return (
    <div className="movieCard" data-testid="movie-card" onClick={open}>
      <div className="movieCard__image">
        <img src={movie.imageUrl} alt={`${movie.title}`} />
      </div>
      <div className="movieCard__content">
        <div className="movieCard__title">{movie.title}</div>
        <MovieCardDropdown
          category={movie.category}
          actions={[
            { action: editMovieAction, label: "Edit" },
            { action: removeMovieAction, label: "Remove" },
          ]}
        />
      </div>
    </div>
  );
};
