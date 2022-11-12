import { Container, IconButton } from "rsuite";
import { useEffect, useState } from "react";
import { useDataService, Movie } from "../../services/DataService";
import { EventCard } from "../MovieCard";
import { FeaturedMovieCard } from "../FeaturedMovieCard";
import { useNavigate } from "react-router-dom";
import { NoResults } from "../NoResults/NoResults";
import { Icon } from "@rsuite/icons";
import "./styles.css";
import { PlusIcon } from "./Plus";
import { NewMovieDrawer } from "../NewMovieView/NewMovieDrawer";

export const AllEventsView = () => {
  const [openNewMovie, setOpenNewMovie] = useState(false);
  const { getAllMovies, allMovies } = useDataService();

  const [movies, setMovies] = useState<Movie[]>([] as Movie[]);
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([] as Movie[]);

  const navigate = useNavigate();

  const addNew = () => {
    setOpenNewMovie(true);
  };

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
  }, [allMovies]);

  const openEventDetailsPage = (eventId: number) => {
    navigate(`/events/${eventId}`);
  };

  if (!featuredMovies.length && !movies.length) {
    return <NoResults />;
  }

  return (
    <>
      <Container className="allEventsView__root">
        <div className="sectionTitle">
          <h2>My favouirite movies</h2>
          <IconButton
            className="iconButton titleIcon"
            onClick={addNew}
            icon={<Icon as={() => <PlusIcon color="#AFC6FF" />} />}
          />
        </div>

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
      <NewMovieDrawer
        open={openNewMovie}
        onClose={() => setOpenNewMovie(false)}
      />
    </>
  );
};
