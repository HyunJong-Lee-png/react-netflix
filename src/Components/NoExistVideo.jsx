import styled from "styled-components";

const NoVideo = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

export default function NoExistVideo({ setIsHover }) {
  return (
    <NoVideo onMouseLeave={() => setIsHover(false)}>
      {"There is no video :("}
    </NoVideo>
  );
}
