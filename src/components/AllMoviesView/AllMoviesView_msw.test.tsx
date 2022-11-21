import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getURI } from "../../services/getUri";
import WrapperComponent from "../../tests/WrapperComponent";
import { AllMoviesView } from "./AllMoviesView";

const mockMovie = {
  id: 1,
  category: "marvel",
  title: "Avengers",
  year: "2015",
  summary: "movie summary",
  rating: 5,
  actors: [],
  imageUrl: "",
};

const server = setupServer(
  rest.get(getURI("movies"), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([mockMovie]));
  }),
  rest.get(getURI("movies/1"), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockMovie));
  })
);

describe("AllMoviesView", () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  it("navigates to details page", async () => {
    render(<AllMoviesView />, { wrapper: WrapperComponent });
    expect(screen.getByTestId("loader")).toBeInTheDocument();

    const movieCard = await screen.findByTestId("movie-card");
    expect(movieCard).toBeInTheDocument();
    userEvent.click(movieCard);

    const movieDetails = await screen.findByTestId("moviedetails");
    expect(movieDetails).toBeInTheDocument();

    const movieCategory = await within(movieDetails).findByText(
      "Marvel movies"
    );
    expect(movieCategory).toBeInTheDocument();
    const goBackLink = within(movieDetails).getByText("Take me back");
    expect(goBackLink).toBeInTheDocument();
    userEvent.click(movieCard);
    expect(movieDetails).toBeInTheDocument();
  });
});
