import { render, screen, within } from "@testing-library/react";
import { AllMoviesView } from "./AllMoviesView";
import { Movie } from "../../services/DataService";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getURI } from "../../services/getUri";
import WrapperComponent from "../../tests/WrapperComponent";

const mockMovie = {
  id: 1,
  category: "Marvel",
  title: "Avengers",
  year: "2015",
  summary: "movie summary",
  rating: 5,
  actors: [],
  imageUrl: "",
};

const mockedResponseMovies: Movie[] = [];

const server = setupServer(
  rest.get(getURI("movies"), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedResponseMovies));
  }),
  rest.post(getURI("movies"), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(req.body));
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

  test("add new movie", async () => {
    render(<AllMoviesView />, { wrapper: WrapperComponent });
    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(
      await screen.findByText("Sorry, there is no movie added yet")
    ).toBeInTheDocument();
    const addNewMovieButton = screen.getByRole("button", {
      name: /add new movie/i,
    });
    expect(addNewMovieButton).toBeInTheDocument();
    userEvent.click(addNewMovieButton);
    const form = await screen.findByTestId("add-new-movie-form");
    expect(form).toBeInTheDocument();

    // select category
    const categoryField = screen.getByTestId("category-field");
    userEvent.click(categoryField);
    const option = await screen.findByRole("option", {
      name: mockMovie.category,
    });
    userEvent.click(option);

    //select title
    const titleField = screen.getByTestId("title-field");
    await userEvent.type(titleField, mockMovie.title);

    //select summary
    const summaryField = screen.getByTestId("summary-field");
    await userEvent.type(summaryField, mockMovie.summary);

    //select year
    const yearField = screen.getByTestId("year-field");
    await userEvent.type(yearField, mockMovie.year);

    //rating
    const ratingField = screen.getByTestId("rating-field");
    const ratingOption = within(ratingField)
      .getAllByRole("radio")
      .filter((el, index) => index === mockMovie.rating - 1)[0];

    userEvent.click(ratingOption);

    server.use(
      rest.get(getURI("movies"), (req, res, ctx) => {
        return res(ctx.json([mockMovie]));
      })
    );

    //submit form
    const submitButton = screen.getByRole("button", {
      name: /add movie/i,
    });
    userEvent.click(submitButton);

    const successMessage = await screen.findByText("movie added successfully");
    expect(successMessage).toBeInTheDocument();
    const movieCard = await screen.findByTestId("movie-card");
    expect(movieCard).toBeInTheDocument();
    const movieCardTitle = within(movieCard).getByText("Avengers");
    expect(movieCardTitle).toBeInTheDocument();
  });
  test("remove existing movie", () => {
    /*
      Write test which will render one card with mockMovie on the page, select option remove from card dropdown
      handle delete request and check for message "Movie Avengers removed" to appear
    */
    expect(true).toBe(true);
  });
});
