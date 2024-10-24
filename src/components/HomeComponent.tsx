"use client";

import { getPopularMovies } from "@/lib/services.global";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Movie } from "../../types";
import { MovieCard } from "./MovieCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const HomeComponent = () => {
  const { ref: infiniteScrollerRef, inView } = useInView();
  const query = useInfiniteQuery({
    queryKey: ["getPopularMovies"],
    queryFn: getPopularMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });
  useEffect(() => {
    if (inView) {
      query.fetchNextPage();
    }
  }, [inView]);

  if (query.isPending) {
    return <>Loading...</>;
  }
  if (query.isError) {
    return <>Errors: {query.error}</>;
  }
  return (
    <>
      <div className="container px-24 mx-auto">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="email" placeholder="Email" />
          <Button type="submit">Subscribe</Button>
        </div>
      </div>
      <div className="container px-24 mx-auto">
        <div className="grid grid-cols-6 gap-8">
          {query.data.pages.map((group, i) => (
            <Fragment key={i}>
              {group.results.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="container px-24 mx-auto">
        <div
          className="h-6 w-6 rounded-full border-2 border-t-slate-500 animate-spin"
          ref={infiniteScrollerRef}
        ></div>
      </div>
    </>
  );
};

export default HomeComponent;
