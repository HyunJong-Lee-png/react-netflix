import { motion } from "framer-motion";
import styled from "styled-components";

export const OverLay = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  backdrop-filter: blur(5px);
  z-index: 98;
`;

export const Wrapper = styled(motion.div)`
  width: 70%;
  position: relative;
  margin-top: 200px;
  border-radius: 20px;
  overflow: scroll;
  overscroll-behavior: contain;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 640px) {
    margin-top: 10%;
    width: 50%;
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

export const BoxInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  padding: 20px;
  background-color: black;
`;

export const BigBox = styled(motion.div)`
  height: 40vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.image});
  background-size: cover;
  background-position: center top;
  position: relative;
`;

export const MovieInfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  margin-bottom: 10px;
  font-size: ${(props) => (props.isDesktop ? "1.2vw" : "2.5vw")};
`;

export const MovieTitle = styled.div`
  font-size: ${(props) => (props.isDesktop ? "2.3vw" : "2.5vw")};
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

export const MovieOverView = styled.div`
  font-size: ${(props) => (props.isDesktop ? "1.2vw" : "2.5vw")};
`;
