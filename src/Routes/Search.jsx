import { useQuery } from "react-query";
import { useMatch, useSearchParams } from "react-router-dom";
import { searchKeyword } from "./api";
import SliderContainer from "../Components/SliderContainer";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import BigMovieContent from "../Components/BigMovieContent";
import { useState } from "react";
import { Loader } from "../Styled-Component/Banner.style";
import BigTvContent from "../Components/BigTvContent";

const Wrapper = styled.div`
  background-color: black;
  padding-top: 200px;
`;

const SearchResults = styled.div`
  font-size: 5vw;
  font-weight: bold;
  text-align: center;
  padding-bottom: 200px;
  @media (min-width: 640px) {
    font-size: 3vw;
  }
`;

const SearchWord = styled.span`
  color: tomato;
  font-size: 9vw;
  @media (min-width: 640px) {
    font-size: 5vw;
  }
`;

export default function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const { data, isLoading } = useQuery(["Search", keyword], () =>
    searchKeyword(keyword)
  );
  const movieDatas = data?.results.filter(
    (data) => data.media_type === "movie"
  );
  const tvDatas = data?.results.filter((data) => data.media_type === "tv");
  const datas = [
    { data: movieDatas, category: "Movie Results", id: 2, name: "search" },
    { data: tvDatas, category: "TV Results", id: 3, name: "search" },
  ];
  const movieMatch = useMatch("/search/:id");
  const [id, setId] = useState();

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>is Loading...</Loader>
      ) : (
        <>
          <SearchResults>
            <SearchWord>"{keyword}"</SearchWord>
            Search Results...
          </SearchResults>
          {datas.map((data) => (
            <SliderContainer
              key={data.id}
              {...data}
              setId={setId}
              keyword={keyword}
            />
          ))}
          <AnimatePresence>
            {movieMatch &&
              (id === 2 ? (
                <BigMovieContent
                  params={movieMatch.params.id}
                  name="search"
                  id={id}
                  keyword={keyword}
                />
              ) : id === 3 ? (
                <BigTvContent
                  params={movieMatch.params.id}
                  name="search"
                  id={id}
                  keyword={keyword}
                />
              ) : null)}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
