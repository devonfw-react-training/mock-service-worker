import { Message, useToaster } from "rsuite";
import { Movie, useDataService } from "../../services/DataService";
import { MovieCardDropdown } from "../MovieCardDropdown";
import "./styles.css";

interface Props {
  movie: Movie;
  onClick: (movieId: number) => void;
  onActionSuccess: () => void;
}

export const FeaturedMovieCard = ({
  movie,
  onClick,
  onActionSuccess,
}: Props) => {
  const { editMovie, removeMovie } = useDataService();
  const toaster = useToaster();

  const editMovieAction = () => {
    editMovie(movie).then(() => {
      toaster.push(
        <Message type="success">movie {movie.title} edited</Message>
      );
      onActionSuccess();
    });
  };

  const removeMovieAction = () => {
    removeMovie(movie).then(() => {
      toaster.push(
        <Message type="success">movie {movie.title} removed</Message>
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
    <div className="featuredMovieCard" onClick={open}>
      <div className="featuredMovieCard__container">
        <div
          className="featuredMovieCard__content"
          style={{ backgroundImage: `url(${movie.imageUrl})` }}
        >
          <div className="featuredMovieCard__backdrop">
            <div className="featuredMovieCard__title">{movie.title}</div>
            <MovieCardDropdown
              category={movie.category}
              actions={[
                { action: editMovieAction, label: "Edit" },
                { action: removeMovieAction, label: "Remove" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
