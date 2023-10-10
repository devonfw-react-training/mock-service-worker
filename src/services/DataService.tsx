import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { getURI } from "./getUri";

export interface Movie {
  id: number;
  title: string;
  year: string;
  category: string;
  location: string;
  summary: string;
  description: string;
  isFeatured?: boolean;
  imageUrl?: string;
  rating: number;
  actors: string[];
}

export interface DataService {
  getAllMovies: () => Promise<Movie[]>;
  allMovies: Movie[];
  addNewMovie: (eventData: Omit<Movie, "id">) => Promise<Movie>;
  getMovie: (id: number) => Promise<Movie>;
  editMovie: (movie: Movie) => Promise<Movie>;
  editedMovie: Movie | null;
  setEditedMovie: (movie: Movie | null) => void;
  removeMovie: (movie: Movie) => Promise<Movie>;
}

const headers = {
  "Content-Type": "application/json",
};

export const DataContext = createContext<DataService>({} as DataService);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [editedMovie, setEditedMovie] = useState<Movie | null>(null);

  const getAllMovies = () => {
    return fetch(getURI("movies/"))
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch list of movies");
        }
        return response.json();
      })
      .then((newMovies) => {
        if (newMovies.length !== allMovies.length) {
          setAllMovies(newMovies);
          return newMovies;
        }
        return allMovies;
      });
  };

  const addNewMovie = (movieData: Omit<Movie, "id">) => {
    console.log("Movie to create", movieData);
    return fetch(getURI("movies/"), {
      method: "POST",
      headers,
      body: JSON.stringify(movieData),
    })
      .then((response) => response.json())
      .then((newMovie) => {
        setAllMovies((prevMovies) => [...prevMovies, newMovie]);
        return newMovie;
      });
  };

  const getMovie = (movieId: number) => {
    return fetch(getURI(`movies/${movieId}/`)).then((response) =>
      response.json()
    );
  };

  const editMovie = (movieData: any) => {
    return fetch(getURI(`movies/${movieData.id}/`), {
      method: "PUT",
      headers,
      body: JSON.stringify(movieData),
    }).then((response) => response.json());
  };

  const removeMovie = (movieData: any) => {
    return fetch(getURI(`movies/${movieData.id}/`), {
      method: "DELETE",
      headers,
      body: JSON.stringify(movieData),
    }).then((response) => response.json());
  };

  return (
    <DataContext.Provider
      value={{
        getAllMovies,
        getMovie,
        allMovies,
        addNewMovie,
        removeMovie,
        setEditedMovie,
        editedMovie,
        editMovie,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export const useDataService = () => {
  return useContext(DataContext);
};
