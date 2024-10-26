"use server";

import { WatchListItem } from "../../types";

global.watchList = global.watchList || [];

export const getWatchList = async () => {
  return global.watchList;
};

export const isAddedToWatchList = async (movieId: number) => {
  return global.watchList.map((m) => m.id).includes(movieId);
};

export const addToWatchList = async (movie: WatchListItem) => {
  if (await isAddedToWatchList(movie.id)) {
    return global.watchList;
  }
  global.watchList.push(movie);
  return global.watchList;
};

export const removeFromWatchList = async (movieId: number) => {
  global.watchList = global.watchList.filter((m) => m.id !== movieId);
  return global.watchList;
};
