import { useQuery } from "react-query";
import { getMovies } from "./api";
import styled from "styled-components";
import { makeImgPath } from "./uitilities";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation, useMatch } from "react-router-dom";
import BigMovieContent from "../Components/BigMovieContent";

const Wrapper = styled.div`
  background-color: black;
  position: relative;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  color: white;
`;

const Banner = styled.div`
  background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)),
  url(${props => props.bgphoto});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 28px;
  width: 50%;
`;

const Slider = styled.div`
  margin-top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;  
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  &>a:last-child>div{
    transform-origin: right center !important;
  }
  &>a:first-child>div{
    transform-origin: left center !important;
  }

`;

export const Box = styled(motion.div)`
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center center;
  height: 300px;
  position: relative;
`;

const Info = styled(motion.div)`
  opacity: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: gray;
  h4{
    text-align: center;
    font-size: 18px;
  }
`;

const Arrow = styled(motion.div)`
  font-size: 30px;
  opacity: 0;
  &>span:first-child,&>span:last-child{
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  };
  &>span:first-child{
    right: 0;
  }
  &>span:last-child{
    left: 0;
  }
`;


const rowVar = {
  hidden: (custom) => ({
    x: custom ? -window.innerWidth : window.innerWidth,
  }),
  visible: {
    x: 0,
  },
  exit: (custom) => ({
    x: custom ? window.innerWidth : -window.innerWidth,
  }),
}

const hoverVar = {
  hover: {
    scale: 1.5,
    y: -80,
    zIndex: 99,
    transition: {
      delay: 0.5,
      duration: 0.3,
    },
  },
};

const infoVar = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
    }
  }
};

export default function Home() {
  const { data, isLoading } = useQuery('Movies', getMovies);
  const [leaving, setLeaving] = useState(false);
  const results = data?.results;
  const [index, setIndex] = useState(0);
  const movieMatch = useMatch('/movie/:id');
  const { state } = useLocation();
  const [direction, setDirection] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      const maxIndex = Math.floor(results.length / 6);
      const searchIndex = index === maxIndex ? 0 : index + 1;
      setIndex(searchIndex);
      setLeaving(true);
      setDirection(false);
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      const maxIndex = Math.floor(results.length / 6);
      const searchIndex = index === 0 ? maxIndex : index - 1;
      setIndex(searchIndex);
      setLeaving(true);
      setDirection(true);
    }
  }
  const initialLeaving = () => setLeaving(false);
  const offset = 6;
  const sixMoives = results?.slice(1).slice(index * offset, index * offset + offset);

  return (
    <Wrapper>
      {isLoading
        ? <Loader>isLoading..</Loader>
        :
        <>
          <Banner
            bgphoto={makeImgPath(results[0].backdrop_path || '')}>
            <Title>{results[0].title}</Title>
            <Overview>{results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence
              mode='popLayout'
              initial={false}
              onExitComplete={initialLeaving}
              custom={direction}
            >
              <Row
                variants={rowVar}
                initial='hidden'
                animate='visible'
                exit='exit'
                key={index}
                transition={{ type: 'spring', duration: 1 }}
                custom={direction}
              >
                {sixMoives.map(movie =>
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    state={{ movie, }}
                  >
                    <Box
                      variants={hoverVar}
                      whileHover='hover'
                      transition={{ duration: 0.3 }}
                      image={makeImgPath(movie.poster_path)}
                      layoutId={movie.id}
                    >
                      <Info variants={infoVar}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  </Link>
                )}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {movieMatch && <BigMovieContent state={state} />}
          </AnimatePresence>
          <Arrow
            whileHover={{ opacity: 1 }}
          >
            <span onClick={increaseIndex}>&rarr;</span>
            <span onClick={decreaseIndex}>&larr;</span>
          </Arrow>
        </>}
    </Wrapper>
  );
}