import { motion } from "framer-motion";
import { Box } from "../Routes/Home";
import styled from "styled-components";
import { makeImgPath } from "../Routes/uitilities";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OverLay = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled(motion.div)`
  width: 500px;
  position: relative;
  border-radius: 20px;
  svg{
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
  background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
`;

export default function BigMovieContent({ state: { movie } }) {
  const {t} = useTranslation();
  const navigate = useNavigate();
  return (
    <OverLay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => navigate('/')}
    >
      <Wrapper layoutId={movie.id} onClick={(e) => e.stopPropagation()}>
        <Box
          image={makeImgPath(movie.backdrop_path)}
        />
        <BoxInfo>
          <h4>
            {movie.title}
          </h4>
          <h4>
            {t(movie.overview)}
          </h4>
        </BoxInfo>
        <Link to={'/'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5" >
            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
          </svg>
        </Link>
      </Wrapper>
    </OverLay>
  );
}