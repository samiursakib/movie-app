"use client";

import { getWatchList } from "@/lib/helpers";
import { MovieCard } from "./MovieCard";
import { WatchListItem } from "../../types";
import { useEffect, useState } from "react";

export default function WatchList() {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    const list = getWatchList();
    setWatchList(list);
  }, []);

  return (
    <div className="p-4 pt-0 md:container md:px-24 mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {watchList.map((item: WatchListItem) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </div>
  );
}
