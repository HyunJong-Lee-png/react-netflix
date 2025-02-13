import styled from "styled-components";

export const CreditWrapper = styled.div`
  margin-top: 20px;
`;

export const CreditTitle = styled.div`
  font-size: ${(props) => (props.isDesktop ? "2.1vw" : "5vw")};
  font-weight: bold;
  color: rgb(239, 155, 155);
  text-align: start;
  margin-bottom: 10px;
`;

export const CreditMembersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => (props.isDesktop ? "auto-fit" : 2)},
    minmax(100px, 1fr)
  );
  gap: 10px;
`;

export const CreditInfoWrapper = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
`;
