import { AnimatePresence } from "framer-motion";
import { makeImgPath } from "../Routes/uitilities";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";
import { getSimilarTvs, getTv, getTvCredit, getTvVideo } from "../Routes/api";
import { useMediaQuery } from "react-responsive";
import Iframe from "./Iframe";
import NoExistVideo from "./NoExistVideo";
import ExitIcon from "./ExitIcon";
import CreditMember from "./CreditMember";
import Genre from "./Genre";
import {
  BigBox,
  BoxInfo,
  MovieInfoWrapper,
  MovieOverView,
  MovieTitle,
  OverLay,
  Wrapper,
} from "../Styled-Component/BigContent.style";

export default function BigTvContent({ params, name, id, setClickInfo }) {
  console.log("하잉");
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const { data: movieVideo } = useQuery("getTvVideo", () =>
    getTvVideo(params - id)
  );
  const { data: movie } = useQuery("getTv", () =>
    id === 3 ? getTv(params - id, "language=ko") : getTv(params - id)
  );
  const { data: creditData } = useQuery("getTvCredit", () =>
    getTvCredit(params - id)
  );
  const { data: similarData } = useQuery("getSimilarTvs", () =>
    getSimilarTvs(params - id)
  );

  const videos = movieVideo?.results;
  console.log(videos);
  const videoLink = videos?.filter(
    (video) =>
      (video.type === "Trailer" || video.type === "Opening Credits") &&
      video.site === "YouTube"
  )[0]?.key;
  const isDesktop = useMediaQuery({ minWidth: 640 });
  const credits = creditData?.cast;
  const similarTvs = similarData?.results;

  return (
    <OverLay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => {
        if (!id) {
          setClickInfo((prev) => !prev);
        }
        navigate(name === "movie" ? "/" : name === "tv" ? "/tv" : "/search");
      }}
    >
      <Wrapper layoutId={Number(params)} onClick={(e) => e.stopPropagation()}>
        <AnimatePresence>
          {isDesktop ? (
            isHover ? (
              videoLink ? (
                <Iframe setIsHover={setIsHover} videoLink={videoLink} />
              ) : (
                <NoExistVideo setIsHover={setIsHover} />
              )
            ) : (
              <BigBox
                image={makeImgPath(
                  isDesktop ? movie?.backdrop_path : movie?.poster_path
                )}
                whileHover={() => setIsHover(true)}
              >
                <MovieTitle isDesktop={isDesktop}>
                  {movie?.title || movie?.name}
                </MovieTitle>
              </BigBox>
            )
          ) : videoLink ? (
            <Iframe setIsHover={setIsHover} videoLink={videoLink} />
          ) : (
            <NoExistVideo setIsHover={setIsHover} />
          )}
        </AnimatePresence>
        <BoxInfo>
          <MovieInfoWrapper isDesktop={isDesktop}>
            <div>평점: ⭐{movie?.vote_average}</div>
            <div>
              방송일자: {movie?.first_air_date}~{movie?.last_air_date}
            </div>
            <div>
              시즌 {movie?.number_of_seasons} ( 총 {movie?.number_of_episodes}{" "}
              에피소드 )
            </div>
          </MovieInfoWrapper>
          <Genre movie={movie} isDesktop={isDesktop} />
          <MovieOverView isDesktop={isDesktop}>{movie?.overview}</MovieOverView>
          <CreditMember
            title={"Casting Members"}
            credits={credits}
            isDesktop={isDesktop}
          />
          <CreditMember
            title={"Similar Movies"}
            credits={similarTvs}
            isDesktop={isDesktop}
          />
        </BoxInfo>
        <ExitIcon name={name} setClickInfo={setClickInfo} id={id} />
      </Wrapper>
    </OverLay>
  );
}
