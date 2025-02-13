import { useQuery } from "react-query";
import { useLocation, useMatch, useSearchParams } from "react-router-dom";
import { searchKeyword } from "./api";
import SliderContainer from "../Components/SliderContainer";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import BigMovieContent from "../Components/BigMovieContent";
import { useEffect } from "react";
import { Loader } from "../Styled-Component/Banner.style";

const Wrapper = styled.div`
  background-color: black;
  padding-top: 200px;
`;

export default function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const { data, isLoading, refetch } = useQuery("Search", () =>
    searchKeyword(keyword)
  );
  const movieDatas = data?.results.filter(
    (data) => data.media_type === "movie"
  );
  const tvDatas = data?.results.filter((data) => data.media_type === "tv");
  const datas = [
    { data: movieDatas, category: "Movie Results", id: 1, name: "search" },
    { data: tvDatas, category: "TV Results", id: 2, name: "search" },
  ];
  const movieMatch = useMatch("/search/:id");
  const { state } = useLocation();

  useEffect(() => {
    if (keyword) {
      refetch();
    }
  }, [keyword]);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>is Loading...</Loader>
      ) : (
        <>
          {datas.map((data) => (
            <SliderContainer key={data.id} {...data} />
          ))}
          <AnimatePresence>
            {movieMatch && (
              <BigMovieContent
                state={state}
                params={movieMatch.params.id}
                name="search"
              />
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
