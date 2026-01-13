import { WatchListItem } from "../../types";

export const getWatchList = () => {
  const list = window.localStorage.getItem("watchList");
  return list ? JSON.parse(list) : [];
};

export const isAddedToWatchList = async (movieId: number) => {
  const list = getWatchList();
  return list.map((m: WatchListItem) => m.id).includes(movieId);
};

export const addToWatchList = async (movie: WatchListItem) => {
  const isAlreadyAdded = await isAddedToWatchList(movie.id);
  const list = getWatchList();
  if (isAlreadyAdded) {
    return list;
  }
  list.push(movie);
  window.localStorage.setItem("watchList", JSON.stringify(list));
  return list;
};

export const removeFromWatchList = async (movieId: number) => {
  const list = getWatchList();
  const newList = list.filter((m: WatchListItem) => m.id !== movieId);
  window.localStorage.setItem("watchList", JSON.stringify(newList));
  return newList;
};
