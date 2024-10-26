import { WatchListItem } from "./types";

export {};

declare global {
  namespace NodeJS {
    interface Global {
      watchList: WatchListItem[];
    }
  }

  var watchList: WatchListItem[];
}
