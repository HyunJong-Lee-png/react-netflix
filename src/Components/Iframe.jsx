import styled from "styled-components";

const IframeWrapper = styled.div`
  height: 40vh;
`;

export default function Iframe({ setIsHover, videoLink }) {
  return (
    <IframeWrapper>
      <iframe
        onMouseLeave={() => setIsHover(false)}
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoLink}?autoplay=1&mute=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </IframeWrapper>
  );
}
