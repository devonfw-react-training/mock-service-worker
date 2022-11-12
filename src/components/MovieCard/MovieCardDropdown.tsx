import { Message, useToaster } from "rsuite";
import { Movie, useDataService } from "../../services/DataService";
import { EventCardDropdown } from "../EventCardDropdown";
import "./styles.css";

interface Props {
  movie: Movie;
  onClick: (movieId: number) => void;
}

export const EventCard = ({ movie, onClick }: Props) => {
  const { editMovie, removeMovie, saveMovie } = useDataService();
  const toaster = useToaster();

  const saveMovieAction = () => {
    saveMovie(movie).then(() =>
      toaster.push(<Message type="success">Movie {movie.title} saved</Message>)
    );
  };

  const editMovieAction = () => {
    saveMovie(movie).then(() =>
      toaster.push(<Message type="success">Movie {movie.title} saved</Message>)
    );
  };

  const removeMovieAction = () => {
    saveMovie(movie).then(() =>
      toaster.push(
        <Message type="success">Movie {movie.title} removed</Message>
      )
    );
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
        <EventCardDropdown
          category={movie.category}
          actions={[
            { action: editMovieAction, label: "Edit" },
            { action: saveMovieAction, label: "Save" },
            { action: removeMovieAction, label: "Remove" },
          ]}
        />
        <div>list of actors</div>
      </div>
    </div>
  );
};
