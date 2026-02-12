export default function Section({ id, title, subtitle, children }) {
  return (
    <div className="section" id={id}>
      {title && <h2 className="section-header">{title}</h2>}
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      {children}
    </div>
  )
}
