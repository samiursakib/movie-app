import constants from "./api-endpoints";
const API_KEY = "304ec0029995426ffd80e403c536d1d3";

export const getPopularMovies = async ({ pageParam = 1 }) => {
  try {
    const response = await fetch(
      constants.popularMoviesUrl +
        `?language=en-US&page=${pageParam}&api_key=${API_KEY}`,
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

export const searchMovies = async (query: string) => {
  try {
    const response = await fetch(
      constants.searchMoviesUrl + `?api_key=${API_KEY}&query=${query}`,
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
