export default function CreditSubTemplate({ children, isDesktop }) {
  if (children) {
    return (
      <div style={{ fontSize: isDesktop ? "1.1vw" : "2.5vw" }}>{children}</div>
    );
  }
}
