import { Message, useToaster } from "rsuite";
import { Movie, useDataService } from "../../services/DataService";
import { MovieCardDropdown } from "../MovieCardDropdown";
import "./styles.css";

interface Props {
  movie: Movie;
  onClick: (movieId: number) => void;
  onActionSuccess: () => void;
}

export const EventCard = ({ movie, onClick, onActionSuccess }: Props) => {
  const { editMovie, removeMovie } = useDataService();
  const toaster = useToaster();

  const editMovieAction = () => {
    editMovie(movie).then(() => {
      toaster.push(
        <Message type="success">Movie {movie.title} edited</Message>
      );
      onActionSuccess();
    });
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
    <div className="eventCard" onClick={open}>
      <div className="eventCard__image">
        <img src={movie.imageUrl} alt={`${movie.title}`} />
      </div>
      <div className="eventCard__content">
        <div className="eventCard__title">{movie.title}</div>
        <MovieCardDropdown
          category={movie.category}
          actions={[
            { action: editMovieAction, label: "Edit" },
            { action: removeMovieAction, label: "Remove" },
          ]}
        />
        <div>list of actors</div>
      </div>
    </div>
  );
};
