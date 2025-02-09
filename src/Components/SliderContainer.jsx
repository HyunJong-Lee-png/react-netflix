import { AnimatePresence } from "framer-motion";
import {
  Arrow,
  Box,
  ChangePages,
  Info,
  MovieCategory,
  Row,
  Slider,
} from "./SliderContainer.style";
import { Link } from "react-router-dom";
import { useState } from "react";
import { makeImgPath } from "../Routes/uitilities";

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
};

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
    },
  },
};

export default function SliderContainer({ data, category, id, name }) {
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      const maxIndex = Math.floor(data.length / 6);
      const searchIndex = index === maxIndex ? 0 : index + 1;
      setIndex(searchIndex);
      setLeaving(true);
      setDirection(false);
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      const maxIndex = Math.floor(data.length / 6);
      const searchIndex = index === 0 ? maxIndex : index - 1;
      setIndex(searchIndex);
      setLeaving(true);
      setDirection(true);
    }
  };

  const initialLeaving = () => setLeaving(false);
  const offset = 6;
  const sixMoives = data
    ?.slice(id === 1 ? 1 : 0)
    .slice(index * offset, index * offset + offset);

  return (
    <Slider>
      <MovieCategory>
        {category}
        <ChangePages>
          <Arrow onClick={decreaseIndex}>&larr;</Arrow>
          <Arrow onClick={increaseIndex}>&rarr;</Arrow>
        </ChangePages>
      </MovieCategory>
      <AnimatePresence
        mode="popLayout"
        initial={false}
        onExitComplete={initialLeaving}
        custom={direction}
      >
        <Row
          variants={rowVar}
          initial="hidden"
          animate="visible"
          exit="exit"
          key={index}
          transition={{ type: "spring", duration: 1 }}
          custom={direction}
        >
          {sixMoives?.map((movie) => (
            <Link
              key={movie.id + id}
              to={`/${name}/${movie.id + id}`}
              state={{ movie }}
            >
              <Box
                variants={hoverVar}
                whileHover="hover"
                transition={{ duration: 0.3 }}
                image={makeImgPath(movie.poster_path)}
                layoutId={movie.id + id}
              >
                <Info variants={infoVar}>
                  <h4>{movie.title || movie.name}</h4>
                </Info>
              </Box>
            </Link>
          ))}
        </Row>
      </AnimatePresence>
    </Slider>
  );
}
