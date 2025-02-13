import styled from "styled-components";

export const GenreWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  font-size: ${(props) => (props.isDesktop ? "1.2vw" : "2.5vw")};
`;

export const GenreContainer = styled.div`
  padding: 3px 10px;
  background-color: #c72e13;
  border-radius: 8px;
`;
