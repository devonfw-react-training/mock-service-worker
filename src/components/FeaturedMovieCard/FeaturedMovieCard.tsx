import { Icon } from "@rsuite/icons";
import { FaStar } from "react-icons/fa";
import { Message, useToaster } from "rsuite";
import { getCategoryColor } from "../../utils/getCategoryColor";
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
  const startDate = new Date(movie.startDate);
  const day = startDate.getDate();
  const month = startDate.getMonth() + 1;
  const year = startDate.getFullYear();

  const { saveMovie, editMovie, removeMovie } = useDataService();
  const backgroundColor = getCategoryColor(movie.category);
  const toaster = useToaster();

  const saveMovieAction = () => {
    saveMovie(movie).then(() =>
      toaster.push(<Message type="success">movie {movie.title} saved</Message>)
    );
  };

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
          className="featuredMovieCard__featured"
          style={{ backgroundColor }}
        >
          <div className="featuredMovieCard__featured-day">{day}</div>
          <Icon as={FaStar} color="#fff" />
          <div className="featuredMovieCard__featured-month">{month}</div>
          <div className="featuredMovieCard__featured-year">{year}</div>
        </div>
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
                { action: saveMovieAction, label: "Save" },
                { action: removeMovieAction, label: "Remove" },
              ]}
            />
            <div>list of actors</div>
          </div>
        </div>
      </div>
    </div>
  );
};
