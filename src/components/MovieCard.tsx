import { imageLoader } from "@/lib/utils";
import Image from "next/image";
import { Movie } from "../../types";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="bg-slate-200 text-sm rounded-md overflow-hidden">
      <Image
        className="w-full"
        loader={imageLoader}
        src={"https://image.tmdb.org/t/p/w185" + movie.poster_path}
        alt={"something"}
        width={100}
        height={100}
      />
      <h1 className="p-4">{movie.title}</h1>
      <div>
        {/* <FaRegBookmark />
        <FaBookmark /> */}
      </div>
    </div>
  );
};
