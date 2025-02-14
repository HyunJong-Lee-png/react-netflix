import { motion } from "framer-motion";
import styled from "styled-components";

export const Slider = styled.div`
  margin-top: ${(props) =>
    props.isDesktop ? "-100px" : props.id === 1 ? "-550px" : "-100px"};
  padding-bottom: 200px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  position: relative;
`;

export const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(
    ${(props) => (props.isDesktop ? 6 : "auto-fit")},
    minmax(100px, 1fr)
  );
  grid-auto-rows: minmax(300px, 1fr);
  & > a:last-child > div {
    transform-origin: right center !important;
  }
  & > a:first-child > div {
    transform-origin: left center !important;
  }
`;

export const Box = styled(motion.div)`
  height: 100%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center center;
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
  font-size: ${(props) => (props.isDesktop ? "4vw" : "7vw")};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Category = styled.div`
  flex: 1;
`;

export const ChangePages = styled.div`
  flex: 1;
  display: flex;
  gap: 4vw;
`;

export const Arrow = styled.span`
  line-height: 1;
  cursor: pointer;
  height: 100%;
`;
