import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: black;
  position: relative;
  min-height: 100%;
`;
export const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  color: white;
`;

export const Banner = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: contain;
  background-repeat: repeat-x;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`;

export const BannerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h2`
  font-size: ${(props) => (props.isDesktop ? "4.5vw" : "7.5vw")};
`;

export const Overview = styled.p`
  font-size: ${(props) => (props.isDesktop ? "1.5vw" : "4vw")};
  width: 50%;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

export const MoreInfo = styled(motion.span)`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  padding: 10px 20px;
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: ${(props) => (props.isDesktop ? "1.5vw" : "4vw")};
`;
