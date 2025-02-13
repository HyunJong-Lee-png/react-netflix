import { GenreContainer, GenreWrapper } from "../Styled-Component/Genre.style";

export default function Genre({ movie, isDesktop }) {
  return (
    <GenreWrapper isDesktop={isDesktop}>
      {movie?.genres?.map((movieInfo, index) => (
        <GenreContainer key={index}>{movieInfo.name}</GenreContainer>
      ))}
    </GenreWrapper>
  );
}
