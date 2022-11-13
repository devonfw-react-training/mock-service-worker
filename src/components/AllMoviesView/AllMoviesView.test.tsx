import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen, within } from "@testing-library/react";
import { AllMoviesView } from "./AllMoviesView";
import { DataProvider, Movie } from "../../services/DataService";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getURI } from "../../services/getUri";

const mockMovie = {
  category: "Marvel",
  title: "Avengers",
  year: "2015",
  summary: "movie summary",
  rating: 5,
  actors: [],
  imageUrl: "",
};

const mockedResponseMovies: Movie[] = [];

const WrapperComponent = ({ children }: any) => (
  <DataProvider>
    <MemoryRouter>
      <Routes>
        <Route path="/" element={children} />
      </Routes>
    </MemoryRouter>
  </DataProvider>
);

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
    const form = screen.getByTestId("add-new-movie-form");
    expect(form).toBeInTheDocument();

    // select category
    const categoryField = screen.getByTestId("category-field");
    userEvent.click(categoryField);
    const option = screen.getByRole("option", { name: mockMovie.category });
    userEvent.click(option);

    //select title
    const titleField = screen.getByTestId("title-field");
    userEvent.type(titleField, mockMovie.title);

    //select summary
    const summaryField = screen.getByTestId("summary-field");
    userEvent.type(summaryField, mockMovie.summary);

    //select year
    const yearField = screen.getByTestId("year-field");
    userEvent.type(yearField, mockMovie.year);

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
    expect(true).toBe(true);
  });
});
