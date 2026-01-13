import { WatchListItem } from "./types";

export {};

declare global {
  namespace NodeJS {
    interface Global {
      watchList: WatchListItem[];
    }
  }

  let watchList: WatchListItem[];
}
