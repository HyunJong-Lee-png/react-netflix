import { useQuery } from "react-query";
import { getAiringTodayTv, getPopularTv, getTopRatedTv } from "./api";
import { makeImgPath } from "./uitilities";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import SliderContainer from "../Components/SliderContainer";
import { useState } from "react";
import BigTvContent from "../Components/BigTvContent";
import { useMediaQuery } from "react-responsive";
import {
  Banner,
  MoreInfo,
  Overview,
  Title,
} from "../Styled-Component/Banner.style";

export default function Tv() {
  const { data, isLoading } = useQuery("AiringTvs", getAiringTodayTv);
  const { data: data1 } = useQuery("PopularTvs", getPopularTv);
  const { data: data2 } = useQuery("TopRatedTvs", getTopRatedTv);
  const [id, setId] = useState();
  const isDesktop = useMediaQuery({ minWidth: 640 });

  const movies = [
    { data: data?.results, category: "Airing Today", id: 1, name: "tv" },
    { data: data1?.results, category: "Popular TV shows", id: 2, name: "tv" },
    { data: data2?.results, category: "Top Rated TV shows", id: 3, name: "tv" },
  ];
  const results = data?.results;
  const movieMatch = useMatch("/tv/:id");

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>isLoading..</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImgPath(results?.[0].backdrop_path || "")}
            isDesktop={isDesktop}
          >
            <Title isDesktop={isDesktop}>{results?.[0].name}</Title>
            <Overview isDesktop={isDesktop}>{results?.[0].overview}</Overview>
            <MoreInfo></MoreInfo>
          </Banner>
          {movies.map((movie) => (
            <SliderContainer key={movie.id} {...movie} setId={setId} />
          ))}

          <AnimatePresence>
            {movieMatch && (
              <BigTvContent params={movieMatch.params.id} name="tv" id={id} />
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
