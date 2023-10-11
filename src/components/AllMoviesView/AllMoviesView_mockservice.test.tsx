import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "../../App";
import { DataContext, DataService } from "../../services/DataService";
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

const WrapperComponent = ({ children }: any) => (
  <DataContext.Provider
    value={
      {
        getAllMovies: async () => [mockMovie],
        getMovie: async () => mockMovie,
      } as unknown as DataService
    }
  >
    <MemoryRouter>
      <AppRoutes />
    </MemoryRouter>
  </DataContext.Provider>
);

describe("AllMoviesView", () => {
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
    userEvent.click(goBackLink);
    expect(await screen.findByTestId("movie-card")).toBeInTheDocument();
  });
});
