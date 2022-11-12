import { Icon } from "@rsuite/icons";
import { FaStar } from "react-icons/fa";
import { Message, useToaster } from "rsuite";
import { getCategoryColor } from "../../utils/getCategoryColor";
import { Movie, useDataService } from "../../services/DataService";
import { EventCardDropdown } from "../EventCardDropdown";
import "./styles.css";

interface Props {
  movie: Movie;
  onClick: (eventId: number) => void;
}

export const FeaturedEventCard = ({ movie, onClick }: Props) => {
  const startDate = new Date(movie.startDate);
  const day = startDate.getDate();
  const month = startDate.getMonth() + 1;
  const year = startDate.getFullYear();

  const { saveMovie, editMovie, removeMovie } = useDataService();
  const backgroundColor = getCategoryColor(movie.category);
  const toaster = useToaster();

  const saveMovieAction = () => {
    saveMovie(movie).then(() =>
      toaster.push(<Message type="success">Event {movie.title} saved</Message>)
    );
  };

  const editMovieAction = () => {
    editMovie(movie).then(() =>
      toaster.push(<Message type="success">Event {movie.title} saved</Message>)
    );
  };

  const removeMovieAction = () => {
    removeMovie(movie).then(() =>
      toaster.push(<Message type="success">Event {movie.title} saved</Message>)
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
    <div className="featuredEventCard" onClick={open}>
      <div className="featuredEventCard__container">
        <div
          className="featuredEventCard__featured"
          style={{ backgroundColor }}
        >
          <div className="featuredEventCard__featured-day">{day}</div>
          <Icon as={FaStar} color="#fff" />
          <div className="featuredEventCard__featured-month">{month}</div>
          <div className="featuredEventCard__featured-year">{year}</div>
        </div>
        <div
          className="featuredEventCard__content"
          style={{ backgroundImage: `url(${movie.imageUrl})` }}
        >
          <div className="featuredEventCard__backdrop">
            <div className="featuredEventCard__title">{movie.title}</div>
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
      </div>
    </div>
  );
};
