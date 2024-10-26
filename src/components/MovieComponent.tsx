"use client";

import { formatDate, imageLoader } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Credit, MovieDetails, Recommendation } from "../../types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const MovieComponent = ({
  movie,
  credit,
  recommendations,
}: {
  movie: MovieDetails;
  credit: Credit;
  recommendations: Recommendation;
}) => {
  const router = useRouter();
  return (
    <div className="container px-24 mx-auto flex gap-8">
      <div className="w-1/3">
        <Image
          loader={imageLoader}
          src={"https://image.tmdb.org/t/p/w185" + movie.poster_path}
          alt={movie.poster_path}
          width={0}
          height={0}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div className="w-2/3 flex flex-col gap-8">
        <div className="text-5xl font-extralight -mb-2">{movie.title}</div>
        <div className="text-xs leading-5">{movie.overview}</div>
        <div>
          <div className="font-bold mb-4">Cast</div>
          <div className="flex flex-wrap gap-4">
            {credit.cast.map((c) => (
              <div key={c.id}>
                <abbr title={c.name} className="no-underline">
                  <Avatar>
                    <AvatarImage
                      src={"https://image.tmdb.org/t/p/w185" + c.profile_path}
                      className="object-cover w-10 h-10"
                    />
                    <AvatarFallback>
                      {c.name
                        .split(" ")
                        .map((word: string) => word.charAt(0).toUpperCase())
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </abbr>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-bold mb-3">Genres</div>
          <div className="flex flex-wrap gap-4">
            {movie.genres.map((g) => (
              <span
                key={g.id}
                className="px-4 py-2 bg-slate-300 dark:bg-blue-950 text-xs rounded-xl"
              >
                {g.name}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="font-bold mb-2">Release Date</div>
          <div className="text-slate-500 text-sm">
            {formatDate(movie.release_date)}
          </div>
        </div>
        <Accordion
          type="single"
          collapsible
          className="-mt-4 hover:no-underline border-0"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold">
              Recommendations
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-6 gap-4">
              {recommendations.results.map((r) => (
                <div key={r.id} onClick={() => router.push("/movies/" + r.id)}>
                  <Image
                    loader={imageLoader}
                    src={"https://image.tmdb.org/t/p/w185" + r.poster_path}
                    alt={r.poster_path}
                    width={0}
                    height={0}
                    className="w-auto h-auto object-cover rounded-lg"
                  />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};