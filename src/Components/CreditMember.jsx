import { makeImgPath } from "../Routes/uitilities";
import {
  CreditInfoWrapper,
  CreditMembersWrapper,
  CreditTitle,
  CreditWrapper,
} from "../Styled-Component/CreditMember.style";
import CreditSubTemplate from "./CreditSubTemplate";
import CreditTemplate from "./CreditTemplate";

export default function CreditMember({ title, credits, isDesktop }) {
  return (
    <CreditWrapper>
      <CreditTitle isDesktop={isDesktop}>{title}</CreditTitle>
      <CreditMembersWrapper isDesktop={isDesktop}>
        {credits?.slice(0, 10).map((credit, i) => (
          <CreditInfoWrapper key={i}>
            {credit.profile_path || credit.poster_path ? (
              <img
                src={makeImgPath(credit.profile_path || credit.poster_path)}
                style={{ minHeight: "20vh" }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "20vh",
                }}
              >
                {"no image :<"}
              </div>
            )}
            <CreditTemplate isDesktop={isDesktop}>
              {credit.name || credit.title}
            </CreditTemplate>
            <CreditSubTemplate isDesktop={isDesktop}>
              {credit.character}
            </CreditSubTemplate>
          </CreditInfoWrapper>
        ))}
      </CreditMembersWrapper>
    </CreditWrapper>
  );
}
