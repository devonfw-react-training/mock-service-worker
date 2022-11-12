import { Container } from "rsuite";
import { useEffect, useState } from "react";
import { useDataService, Movie } from "../../services/DataService";
import { EventCard } from "../MovieCard";
import { FeaturedMovieCard } from "../FeaturedMovieCard";
import { useNavigate } from "react-router-dom";
import { NoResults } from "../NoResults/NoResults";
import "./styles.css";

export const AllEventsView = () => {
  const { getAllMovies } = useDataService();

  const [movies, setMovies] = useState<Movie[]>([] as Movie[]);
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([] as Movie[]);

  const navigate = useNavigate();

  const refreshEvents = () => {
    getAllMovies().then((newMovies) => {
      const featuredEvents = newMovies.filter((e) => e.isFeatured);
      const nonFeaturedEvents = newMovies.filter((e) => !e.isFeatured);
      setFeaturedMovies(featuredEvents);
      setMovies(nonFeaturedEvents);
    });
  };

  useEffect(() => {
    refreshEvents();
  }, []);

  const openEventDetailsPage = (eventId: number) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <Container className="allEventsView__root">
      {!featuredMovies.length && !movies.length && <NoResults />}

      {featuredMovies.map((movie) => (
        <FeaturedMovieCard
          key={movie.id}
          movie={movie}
          onClick={openEventDetailsPage}
          onActionSuccess={refreshEvents}
        />
      ))}
      {movies.map((movie) => (
        <EventCard
          key={movie.id}
          movie={movie}
          onClick={openEventDetailsPage}
          onActionSuccess={refreshEvents}
        />
      ))}
    </Container>
  );
};
