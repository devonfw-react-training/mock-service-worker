import { useState } from "react";
import { Button, Container } from "rsuite";
import { NewMovieDrawer } from "../NewMovieView/NewMovieDrawer";
import { Icon } from "@rsuite/icons";
import { PlusIcon } from "../NewMovieView/Plus";
import NoResultsImage from "./no_results.png";
import "./styles.css";

export const NoResults = () => {
  const [openNewmovie, setOpenNewmovie] = useState(false);

  const addNew = () => {
    setOpenNewmovie(true);
  };

  return (
    <Container className="noResults">
      <div className="noResults__title">Sorry, there is no movie added yet</div>
      <img
        className="noResults__image"
        src={NoResultsImage}
        alt="no results found"
      />
      <Button
        appearance="primary"
        className="appButton noResults__action"
        onClick={addNew}
      >
        <Icon
          as={() => <PlusIcon color="#fff" />}
          style={{ marginRight: "12px" }}
        />
        Add new movie
      </Button>
      <NewMovieDrawer
        open={openNewmovie}
        onClose={() => setOpenNewmovie(false)}
      />
    </Container>
  );
};
