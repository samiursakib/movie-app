import { MovieCard } from "@/components/MovieCard";
import { getWatchList } from "@/lib/server-actions";
import { WatchListItem } from "../../../types";

export default async function Page() {
  const watchList = await getWatchList();
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
