import { MovieComponent } from "@/components/MovieComponent";
import {
  getMovieCredits,
  getMovieDetails,
  getMovieRecommendations,
} from "@/lib/services.global";

export default async function Page({ params }: { params: { id: number } }) {
  const { id: movieId } = params;
  const movie = await getMovieDetails(movieId);
  const credit = await getMovieCredits(movieId);
  const recommendations = await getMovieRecommendations(movieId);
  console.log(recommendations);
  return (
    <MovieComponent
      movie={movie}
      credit={credit}
      recommendations={recommendations}
    />
  );
}
