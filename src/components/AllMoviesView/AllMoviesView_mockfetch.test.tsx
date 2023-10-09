import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getURI } from "../../services/getUri";
import WrapperComponent from "../../tests/WrapperComponent";
import { AllMoviesView } from "./AllMoviesView";
import { vi } from "vitest";

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

async function mockFetch(url: string, config: { method: string; body: any }) {
  if (!url) return;

  switch (url) {
    case getURI("movies/"): {
      return {
        ok: true,
        status: 200,
        json: async () => [mockMovie],
      };
    }
    case getURI("movies/1/"): {
      if (config && config.method === "PUT") {
        return {
          ok: true,
          status: 200,
          json: async () => JSON.parse(config.body),
        };
      }
      return {
        ok: true,
        status: 200,
        json: async () => mockMovie,
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}

describe("AllMoviesView", () => {
  beforeAll(() => vi.spyOn(window, "fetch"));
  beforeEach(() => (window.fetch as any).mockImplementation(mockFetch));

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
