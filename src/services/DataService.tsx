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
  startDate: Date;
  endDate: Date;
  users: string[];
  category: string;
  location: string;
  summary: string;
  description: string;
  isFeatured?: boolean;
  imageUrl?: string;
  participants: number[];
  rating: number;
}

export interface DataService {
  getAllMovies: () => Promise<Movie[]>;
  allMovies: Movie[];
  addNewMovie: (eventData: any) => Promise<Movie>;
  getMovie: (id: number) => Promise<Movie>;
  saveMovie: (a) => Promise<Movie>;
  editMovie: (a) => Promise<Movie>;
  removeMovie: (a) => Promise<Movie>;
}

const headers = {
  "Content-Type": "application/json",
};

export const DataContext = createContext<DataService>({} as DataService);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [allMovies, setAllMovies] = useState([]);

  const getAllMovies = () => {
    return fetch(getURI("movies/"))
      .then((response) => response.json())
      .then((newMovies) => {
        setAllMovies(newMovies);
        return newMovies;
      });
  };

  const addNewMovie = (movieData: any) => {
    const movie = {
      ...movieData,
      startDate: new Date(movieData.startDate).toISOString(),
      endDate: new Date(movieData.endDate).toISOString(),
      participants: [],
    };
    console.log("Movie to create", movie);
    return fetch(getURI("movies/"), {
      method: "POST",
      headers,
      body: JSON.stringify(movie),
    }).then((response) => response.json());
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
      method: "PUT",
      headers,
      body: JSON.stringify(movieData),
    }).then((response) => response.json());
  };

  const saveMovie = (movieData: any) => {
    return fetch(getURI(`movies/${movieData.id}/`), {
      method: "PATCH",
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
        saveMovie,
        removeMovie,
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
