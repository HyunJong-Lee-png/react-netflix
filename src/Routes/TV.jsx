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
  BannerInfo,
  Loader,
  MoreInfo,
  Overview,
  Title,
  Wrapper,
} from "../Styled-Component/Banner.style";
import { BsExclamationCircle } from "react-icons/bs";

export default function Tv() {
  const { data, isLoading } = useQuery("AiringTvs", getAiringTodayTv);
  const { data: data1 } = useQuery("TopRatedTvs", getTopRatedTv);
  const { data: data2 } = useQuery("PopularTvs", getPopularTv);
  const [id, setId] = useState();

  const movies = [
    { data: data?.results, category: "Airing Today", id: 1, name: "tv" },
    { data: data1?.results, category: "Top Rated TV shows", id: 2, name: "tv" },
    { data: data2?.results, category: "Popular TV shows", id: 3, name: "tv" },
  ];
  const results = data?.results;
  const movieMatch = useMatch("/tv/:id");
  const isDesktop = useMediaQuery({ minWidth: 640 });
  const [clickInfo, setClickInfo] = useState(false);

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
            <BannerInfo>
              <Title isDesktop={isDesktop}>{results?.[0].name}</Title>
              <Overview isDesktop={isDesktop}>{results?.[0].overview}</Overview>
              <AnimatePresence>
                {clickInfo ? (
                  <BigTvContent
                    params={results?.[0].id}
                    name={"tv"}
                    id={0}
                    setClickInfo={setClickInfo}
                  />
                ) : (
                  <MoreInfo
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.7)" }}
                    whileTap={{ backgroundColor: "rgba(255,255,255,0.7)" }}
                    onClick={() => setClickInfo((prev) => !prev)}
                    layoutId={results?.[0].id}
                    isDesktop={isDesktop}
                  >
                    <BsExclamationCircle />
                    MoreInfo
                  </MoreInfo>
                )}
              </AnimatePresence>
            </BannerInfo>
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
