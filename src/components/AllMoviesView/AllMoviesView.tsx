import { Container, IconButton, Loader, Placeholder } from "rsuite";
import { useCallback, useEffect, useState } from "react";
import { useDataService, Movie } from "../../services/DataService";
import { MovieCard } from "../MovieCard";
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

  const navigate = useNavigate();

  const addNew = useCallback(() => {
    setOpenNewMovie(true);
  }, []);

  const refreshMovies = async () => {
    setLoading(true);
    const newMovies = await getAllMovies();
    setMovies(newMovies);
    setLoading(false);
  };

  useEffect(() => {
    if (!movies.length || allMovies.length !== movies.length) {
      refreshMovies();
    }
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

  if (!movies.length) {
    return <NoResults />;
  }

  return (
    <>
      <Container className="allEventsView__root">
        <div className="sectionTitle">
          <h2>My favourite movies</h2>
          <IconButton
            data-testid="add-movie-button"
            className="iconButton titleIcon"
            onClick={addNew}
            icon={
              <Icon as={() => <PlusIcon onClick={addNew} color="#AFC6FF" />} />
            }
          />
        </div>

        {movies.map((movie) => (
          <MovieCard
            key={movie.title}
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
