import { Container, IconButton, Loader, Placeholder } from "rsuite";
import { useCallback, useEffect, useState } from "react";
import { useDataService, Movie } from "../../services/DataService";
import { MovieCard } from "../MovieCard";
import { FeaturedMovieCard } from "../FeaturedMovieCard";
import { useNavigate } from "react-router-dom";
import { NoResults } from "../NoResults/NoResults";
import { Icon } from "@rsuite/icons";
import "./styles.css";
import { PlusIcon } from "./Plus";
import { NewMovieDrawer } from "../NewMovieView/NewMovieDrawer";

const PageLoader = () => (
  <div data-testid="loader">
    <Placeholder.Paragraph rows={8} />
    <Loader center content="loading" />
  </div>
);

export const AllMoviesView = () => {
  const [openNewMovie, setOpenNewMovie] = useState(false);
  const [loading, setLoading] = useState(true);
  const { getAllMovies, allMovies, editedMovie, setEditedMovie } =
    useDataService();

  const [movies, setMovies] = useState<Movie[]>([] as Movie[]);
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([] as Movie[]);

  const navigate = useNavigate();

  const addNew = useCallback(() => {
    setOpenNewMovie(true);
  }, []);

  const refreshMovies = () => {
    setLoading(true);
    getAllMovies().then((newMovies) => {
      const featuredEvents = newMovies.filter((e) => e.isFeatured);
      const nonFeaturedEvents = newMovies.filter((e) => !e.isFeatured);
      setFeaturedMovies(featuredEvents);
      setMovies(nonFeaturedEvents);
      setLoading(false);
    });
  };

  useEffect(() => {
    refreshMovies();
  }, [allMovies]);

  useEffect(() => {
    if (editedMovie) {
      setOpenNewMovie(true);
    } else {
      setOpenNewMovie(false);
    }
  }, [editedMovie]);

  const openEventDetailsPage = (eventId: number) => {
    navigate(`/movies/${eventId}`);
  };

  if (loading) return <PageLoader />;

  if (!featuredMovies.length && !movies.length) {
    return <NoResults />;
  }

  return (
    <>
      <Container className="allEventsView__root">
        <div className="sectionTitle">
          <h2>My favouirite movies</h2>
          <IconButton
            data-testid="add-movie-button"
            className="iconButton titleIcon"
            onClick={addNew}
            icon={
              <Icon as={() => <PlusIcon onClick={addNew} color="#AFC6FF" />} />
            }
          />
        </div>

        {featuredMovies.map((movie) => (
          <FeaturedMovieCard
            key={movie.id}
            movie={movie}
            onClick={openEventDetailsPage}
            onActionSuccess={refreshMovies}
          />
        ))}

        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={openEventDetailsPage}
            onActionSuccess={refreshMovies}
          />
        ))}
      </Container>
      <NewMovieDrawer
        open={openNewMovie}
        onClose={() => {
          setEditedMovie(null);
          setOpenNewMovie(false);
        }}
      />
    </>
  );
};
