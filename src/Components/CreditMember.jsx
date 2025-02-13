import { makeImgPath } from "../Routes/uitilities";
import {
  CreditInfoWrapper,
  CreditMembersWrapper,
  CreditTitle,
  CreditWrapper,
} from "../Styled-Component/CreditMember.style";

export default function CreditMember({ title, credits, isDesktop }) {
  return (
    <CreditWrapper>
      <CreditTitle isDesktop={isDesktop}>{title}</CreditTitle>
      <CreditMembersWrapper isDesktop={isDesktop}>
        {credits?.slice(0, 10).map((credit, i) => (
          <CreditInfoWrapper key={i}>
            {credit.profile_path ? (
              <img
                src={makeImgPath(credit.profile_path)}
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
            <div style={{ fontSize: isDesktop ? "1.1vw" : "2.8vw" }}>
              {credit.name}
            </div>
            <div style={{ fontSize: isDesktop ? "1.1vw" : "2.5vw" }}>
              ({credit.character})
            </div>
          </CreditInfoWrapper>
        ))}
      </CreditMembersWrapper>
    </CreditWrapper>
  );
}
