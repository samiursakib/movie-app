"use client";

import {
  GlobalStateType,
  useGlobalState,
} from "@/app/providers/GlobalStateContextProvider";
import constants from "@/lib/api-endpoints";
import { getPopularMovies } from "@/lib/services.global";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { Movie } from "../../types";
import { MovieCard } from "./MovieCard";
import { Button } from "./ui/button";
import { Loader } from "./loader";

const API_KEY = "304ec0029995426ffd80e403c536d1d3";

const HomeComponent = () => {
  const {
    globalState: { isSearching, searchInputValue },
    setGlobalState,
  } = useGlobalState();
  const { ref: infiniteScrollerRef, inView } = useInView();
  const query = useInfiniteQuery({
    queryKey: ["getPopularMovies"],
    queryFn: getPopularMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.total_pages === lastPage.page ? null : lastPage.page + 1,
  });
  const searchQuery = useInfiniteQuery({
    queryKey: ["searchMovies", searchInputValue],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        constants.searchMoviesUrl +
          `?api_key=${API_KEY}&query=${searchInputValue}&page=${pageParam}`
      );
      if (!response.ok) {
        throw new Error(`Error during searching movies ${response}`);
      }
      const result = await response.json();
      return result;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.total_pages === lastPage.page ? null : lastPage.page + 1,
  });
  const currentData = isSearching ? searchQuery : query;
  useEffect(() => {
    if (inView && !isSearching) {
      query.fetchNextPage();
    }
    if (inView && isSearching) {
      searchQuery.fetchNextPage();
    }
  }, [inView]);

  if (currentData.isPending) {
    return (
      <div className="py-40">
        <Loader />
      </div>
    );
  }
  if (currentData.isError) {
    return <>Errors: {currentData.error}</>;
  }

  return (
    <>
      <div className="p-8 pt-0 md:container md:px-24 mx-auto">
        {isSearching ? (
          <Button
            className="flex items-center mb-8"
            onClick={() =>
              setGlobalState((prev: GlobalStateType) => ({
                ...prev,
                isSearching: false,
              }))
            }
          >
            <FaArrowLeft />
          </Button>
        ) : (
          <></>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {currentData.data?.pages.map((group, i) => (
            <Fragment key={i}>
              {group.results.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="container px-24 mx-auto py-40">
        <div
          className="mx-auto h-6 w-6 rounded-full border-2 border-t-slate-500 animate-spin"
          ref={infiniteScrollerRef}
        ></div>
      </div>
    </>
  );
};

export default HomeComponent;
