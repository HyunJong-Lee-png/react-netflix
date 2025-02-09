import { motion } from "framer-motion";
import styled from "styled-components";

export const Slider = styled.div`
  margin-top: -100px;
  padding-bottom: 200px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  & > a:last-child > div {
    transform-origin: right center !important;
  }
  & > a:first-child > div {
    transform-origin: left center !important;
  }
`;

export const Box = styled(motion.div)`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center center;
  height: 300px;
  position: relative;
`;

export const Info = styled(motion.div)`
  opacity: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: gray;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

export const MovieCategory = styled.div`
  font-size: 50px;
  position: relative;
  font-weight: bold;
`;

export const ChangePages = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  display: flex;
  gap: 50px;
  height: 100%;
`;

export const Arrow = styled.span`
  line-height: 1;
  cursor: pointer;
  height: 100%;
`;
