import { useQuery } from "react-query";
import { getMovies, getTopRatedMovies, getUpcomingMovies } from "./api";
import { makeImgPath } from "./uitilities";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import BigMovieContent from "../Components/BigMovieContent";
import SliderContainer from "../Components/SliderContainer";
import { useState } from "react";
import {
  Banner,
  BannerInfo,
  Loader,
  MoreInfo,
  Overview,
  Title,
  Wrapper,
} from "../Styled-Component/Banner.style";
import { useMediaQuery } from "react-responsive";
import { BsExclamationCircle } from "react-icons/bs";

export default function Home() {
  const { data, isLoading } = useQuery("Movies", getMovies);
  const { data: data1 } = useQuery("TopMovies", getTopRatedMovies);
  const { data: data2 } = useQuery("UpcomingMovies", getUpcomingMovies);
  const [id, setId] = useState();
  const movies = [
    {
      data: data?.results,
      category: "Now Playing Movies",
      id: 1,
      name: "movie",
    },
    {
      data: data1?.results,
      category: "Top Rateds",
      id: 2,
      name: "movie",
    },
    { data: data2?.results, category: "Upcoming Movies", id: 3, name: "movie" },
  ];
  const results = data?.results;
  const movieMatch = useMatch("/movie/:id");
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
              <Title isDesktop={isDesktop}>{results?.[0].title}</Title>
              <Overview isDesktop={isDesktop}>{results?.[0].overview}</Overview>
              <AnimatePresence>
                {clickInfo ? (
                  <BigMovieContent
                    params={results?.[0].id}
                    name={"movie"}
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
              <BigMovieContent
                params={movieMatch.params.id}
                name="movie"
                id={id}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
