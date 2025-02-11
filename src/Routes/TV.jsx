import { useQuery } from "react-query";
import { getAiringTodayTv, getPopularTv, getTopRatedTv } from "./api";
import styled from "styled-components";
import { makeImgPath } from "./uitilities";
import { AnimatePresence } from "framer-motion";
import { useLocation, useMatch } from "react-router-dom";
import BigMovieContent from "../Components/BigMovieContent";
import SliderContainer from "../Components/SliderContainer";
import { Banner, Loader, Overview, Title, Wrapper } from "./Home";

export default function Tv() {
  const { data, isLoading } = useQuery("AiringTvs", getAiringTodayTv);
  const { data: data1 } = useQuery("PopularTvs", getPopularTv);
  const { data: data2 } = useQuery("TopRatedTvs", getTopRatedTv);

  const movies = [
    { data: data?.results, category: "Airing Today", id: 1, name: "tv" },
    { data: data1?.results, category: "Popular TV shows", id: 2, name: "tv" },
    { data: data2?.results, category: "Top Rated TV shows", id: 3, name: "tv" },
  ];
  const results = data?.results;
  const movieMatch = useMatch("/tv/:id");
  const { state } = useLocation();

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>isLoading..</Loader>
      ) : (
        <>
          <Banner bgphoto={makeImgPath(results?.[0].backdrop_path || "")}>
            <Title>{results?.[0].name}</Title>
            <Overview>{results?.[0].overview}</Overview>
          </Banner>
          {movies.map((movie) => (
            <SliderContainer key={movie.id} {...movie} />
          ))}

          <AnimatePresence>
            {movieMatch && (
              <BigMovieContent
                state={state}
                params={movieMatch.params.id}
                name="tv"
              />
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
