import { useQuery } from "react-query";
import { getMovies, getTopRatedMovies, getUpcomingMovies } from "./api";
import styled from "styled-components";
import { makeImgPath } from "./uitilities";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import BigMovieContent from "../Components/BigMovieContent";
import SliderContainer from "../Components/SliderContainer";
import { useState } from "react";

export const Wrapper = styled.div`
  background-color: black;
  position: relative;
`;
export const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  color: white;
`;

export const Banner = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: contain;
  background-repeat: repeat-x;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 4.5vw;
  margin-bottom: 20px;
`;

export const Overview = styled.p`
  font-size: 1.5vw;
  width: 50%;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

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

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>isLoading..</Loader>
      ) : (
        <>
          <Banner bgphoto={makeImgPath(results?.[0].backdrop_path || "")}>
            <Title>{results?.[0].title}</Title>
            <Overview>{results?.[0].overview}</Overview>
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
