import { FaAngleLeft, FaMapMarkerAlt, FaRegBookmark } from "react-icons/fa";
import {
  Col,
  Container,
  Grid,
  IconButton,
  Message,
  Row,
  useToaster,
} from "rsuite";
import { Icon } from "@rsuite/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Movie, useDataService } from "../../services/DataService";
import { getCategoryColor } from "../../utils/getCategoryColor";
import "./styles.css";

export const MovieDetailsPage = () => {
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const navigate = useNavigate();

  const { movieId } = useParams();
  const { getMovie } = useDataService();

  const { saveMovie } = useDataService();
  const toaster = useToaster();

  const savemovieAction = () => {
    saveMovie(movie).then(() =>
      toaster.push(<Message type="success">movie {movie.title} saved</Message>)
    );
  };

  const getCategoryString = (category: string) => {
    switch (category) {
      case "horror":
        return "Horror movies";
      case "thriller":
        return "Thriller movies";
      case "drama":
        return "Drama movies";
      case "marvel":
        return "Marvel movies";
      default:
        return "Other movies";
    }
  };

  const categoryColor = getCategoryColor(movie.category);

  useEffect(() => {
    if (movieId) {
      getMovie(+movieId).then((newMovie) => {
        setMovie(newMovie);
        return newMovie;
      });
    }
  }, [movieId]);

  const goBack = () => {
    navigate("/");
  };

  return (
    <Grid fluid>
      <Row className="show-grid">
        <Col xs={24} sm={24} md={14}>
          <Container className="movieDetailsView__leftColumn">
            <div className="movieDetailsView__goBack" onClick={goBack}>
              {" "}
              <Icon
                as={FaAngleLeft}
                color="#9F9F9F"
                className="movieDetailsView__goBackIcon"
              />
              Take me back
            </div>
            <h2 className="sectionTitle">{movie.title}</h2>
            <div
              className="movieDetailsView__category"
              style={{ color: categoryColor }}
            >
              {getCategoryString(movie.category)}
            </div>
            {movie.summary && (
              <div className="movieDetailsView__summary">{movie.summary}</div>
            )}
            {movie.description && (
              <div className="movieDetailsView__description">
                {movie.description}
              </div>
            )}
          </Container>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Container className="movieDetailsView__rightColumn">
            <div className="movieDetailsView__actions" onClick={goBack}>
              <IconButton
                className="iconButton savemovieButton"
                onClick={savemovieAction}
                icon={<Icon as={FaRegBookmark} color="#AFC6FF" />}
              />
            </div>

            {movie.imageUrl && (
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="movieDetailsView__image"
              />
            )}

            <p className="movieDetailsView__actorsinfo">list of actors</p>
          </Container>
        </Col>
      </Row>
    </Grid>
  );
};
