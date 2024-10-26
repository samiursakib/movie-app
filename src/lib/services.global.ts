import constants from "./api-endpoints";
const API_KEY = "304ec0029995426ffd80e403c536d1d3";

export const getPopularMovies = async ({ pageParam = 1 }) => {
  try {
    const response = await fetch(
      constants.popularMoviesUrl +
        `?language=en-US&page=${pageParam}&api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`Error during fetching popular movies ${response}`);
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const searchMovies = async ({
  key,
  searchInputValue = "",
  pageParam = 1,
}: {
  key: string;
  searchInputValue: string;
  pageParam: number;
}) => {
  try {
    const response = await fetch(
      constants.searchMoviesUrl +
        `?api_key=${API_KEY}&query=${searchInputValue}&page=${pageParam}`
    );
    if (!response.ok) {
      throw new Error(`Error during searching movies ${response}`);
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getMovieDetails = async (movieId: number) => {
  try {
    const response = await fetch(
      `${constants.getMovieDetailsUrl}/${movieId}?api_key=${API_KEY}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error during fetching movie details ${response}`);
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getMovieCredits = async (movieId: number) => {
  try {
    const response = await fetch(
      `${constants.getMovieDetailsUrl}/${movieId}/credits?api_key=${API_KEY}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error during fetching movie credits ${response}`);
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getMovieRecommendations = async (movieId: number) => {
  try {
    const response = await fetch(
      `${constants.getMovieDetailsUrl}/${movieId}/recommendations?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(
        `Error during fetching movie recommendations ${response}`
      );
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};
