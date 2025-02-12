import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { makeImgPath } from "../Routes/uitilities";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";
import { getOriginalTv, getTv, getTvCredit, getTvVideo } from "../Routes/api";
import { useMediaQuery } from "react-responsive";

const OverLay = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  backdrop-filter: blur(5px);
`;

const Wrapper = styled(motion.div)`
  width: 50%;
  position: relative;
  margin-top: 10%;
  border-radius: 20px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  svg {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    fill: whitesmoke;
    width: 30px;
    height: 30px;
  }
`;

const BoxInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  padding: 20px;
  background-color: black;
`;

const NoVideo = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const GenreWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  font-size: 1vw;
`;

const GenreContainer = styled.div`
  padding: 3px 10px;
  background-color: #c72e13;
  border-radius: 8px;
`;

const MovieInfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  margin-bottom: 10px;
  font-size: 1.2vw;
`;

const MovieTitle = styled.div`
  font-size: 2vw;
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

const MovieOverView = styled.div`
  font-size: 1vw;
`;

const CreditWrapper = styled.div`
  margin-top: 20px;
`;

const CreditTitle = styled.div`
  font-size: 2vw;
  font-weight: bold;
  color: rgb(239, 155, 155);
  text-align: start;
  margin-bottom: 10px;
`;

const CreditMembersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
`;

const CreditInfoWrapper = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
`;

const IframeWrapper = styled.div`
  height: 40vh;
`;

export const BigBox = styled(motion.div)`
  height: 40vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.image});
  background-size: cover;
  background-position: center top;
  position: relative;
`;

export default function BigTvContent({ params, name, id }) {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const { data: movieVideo } = useQuery("getTvVideo", () =>
    getTvVideo(params - id)
  );
  const { data: movie } = useQuery("getTv", () =>
    id === 3 ? getTv(params - id) : getOriginalTv(params - id)
  );
  const { data: creditData } = useQuery("getTvCredit", () =>
    getTvCredit(params - id)
  );
  const videos = movieVideo?.results;
  const videoLink = videos?.filter(
    (video) =>
      (video.type === "Trailer" || video.type === "Opening Credits") &&
      video.site === "YouTube"
  )[0]?.key;
  const isDesktop = useMediaQuery({ minWidth: 640 });
  const credits = creditData?.cast;

  return (
    <OverLay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() =>
        navigate(name === "movie" ? "/" : name === "tv" ? "/tv" : "/search")
      }
    >
      <Wrapper layoutId={Number(params)} onClick={(e) => e.stopPropagation()}>
        <AnimatePresence>
          {isHover ? (
            videoLink ? (
              <IframeWrapper>
                <iframe
                  onMouseLeave={() => setIsHover(false)}
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoLink}?autoplay=1&mute=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </IframeWrapper>
            ) : (
              <NoVideo onMouseLeave={() => setIsHover(false)}>
                {"There is no video :("}
              </NoVideo>
            )
          ) : (
            <BigBox
              image={makeImgPath(
                isDesktop ? movie?.backdrop_path : movie?.poster_path
              )}
              whileHover={() => setIsHover(true)}
            >
              <MovieTitle>{movie?.title || movie?.name}</MovieTitle>
            </BigBox>
          )}
        </AnimatePresence>
        <BoxInfo>
          <MovieInfoWrapper>
            <div>평점: ⭐{movie?.vote_average}</div>
            <div>
              방송일자: {movie?.first_air_date}~{movie?.last_air_date}
            </div>
            <div>
              시즌 {movie?.number_of_seasons} ( 총 {movie?.number_of_episodes}{" "}
              에피소드 )
            </div>
          </MovieInfoWrapper>
          <GenreWrapper>
            {movie?.genres?.map((movieInfo, index) => (
              <GenreContainer key={index}>{movieInfo.name}</GenreContainer>
            ))}
          </GenreWrapper>
          <MovieOverView>{movie?.overview}</MovieOverView>
          <CreditWrapper>
            <CreditTitle>Casting Members</CreditTitle>
            <CreditMembersWrapper>
              {credits?.slice(0, 20).map((credit, i) => (
                <CreditInfoWrapper key={i}>
                  {credit.profile_path ? (
                    <img
                      src={makeImgPath(credit.profile_path)}
                      style={{ minHeight: "20vh" }}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "20vh",
                      }}
                    >
                      {"no image :<"}
                    </div>
                  )}
                  <div style={{ fontSize: "1.1vw" }}>{credit.name}</div>
                  <div style={{ fontSize: "1.1vw" }}>({credit.character})</div>
                </CreditInfoWrapper>
              ))}
            </CreditMembersWrapper>
          </CreditWrapper>
        </BoxInfo>

        <Link to={name === "movie" ? "/" : name === "tv" ? "/tv" : "/search"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </Wrapper>
    </OverLay>
  );
}
