"use client";

import { imageLoader } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Movie, WatchListItem } from "../../types";

export const MovieCard = ({ movie }: { movie: Movie | WatchListItem }) => {
  const router = useRouter();
  return (
    <div
      className="dark:bg-slate-800 dark:text-slate-400 bg-slate-300 text-slate-800 text-xs rounded-md overflow-hidden hover:cursor-pointer"
      onClick={() => router.push("/movies/" + movie.id)}
    >
      <Image
        className="w-full"
        loader={imageLoader}
        src={"https://image.tmdb.org/t/p/w185" + movie.poster_path}
        alt={movie.title}
        width={100}
        height={100}
        onError={(e) =>
          (e.currentTarget.src = "https://via.placeholder.com/600/92c952")
        }
      />
      <div className="px-4 py-2 flex text-center justify-center items-center">
        <div>{movie.title}</div>
      </div>
    </div>
  );
};
