import { imageLoader } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Movie } from "../../types";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const router = useRouter();
  return (
    <div
      className="bg-slate-800 text-slate-400 text-xs rounded-md overflow-hidden"
      onClick={() => router.push("/movies/" + movie.id)}
    >
      <Image
        className="w-full"
        loader={imageLoader}
        src={"https://image.tmdb.org/t/p/w185" + movie.poster_path}
        alt={movie.title}
        width={100}
        height={100}
      />
      <div className="px-4 py-2 flex text-center justify-center items-center">
        <div>{movie.title}</div>
      </div>
    </div>
  );
};
