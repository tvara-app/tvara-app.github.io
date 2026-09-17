export default function SpotlightCard({ children, className = "" }) {
  return <div className={`card ${className}`} data-spotlight>{children}</div>;
}
