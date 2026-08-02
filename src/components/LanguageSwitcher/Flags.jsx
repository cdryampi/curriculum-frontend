const FlagES = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 60 40" aria-hidden="true" focusable="false">
    <rect width="60" height="40" fill="#aa151b" />
    <rect y="10" width="60" height="20" fill="#f1bf00" />
    <circle cx="30" cy="20" r="4" fill="#aa151b" />
  </svg>
)

const FlagGB = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 60 40" aria-hidden="true" focusable="false">
    <rect width="60" height="40" fill="#012169" />
    <path d="M0 0L60 40M60 0L0 40" stroke="#ffffff" strokeWidth="10" />
    <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="4" />
    <rect x="26" width="8" height="40" fill="#ffffff" />
    <rect y="16" width="60" height="8" fill="#ffffff" />
    <rect x="29" width="2" height="40" fill="#C8102E" />
    <rect y="19" width="60" height="2" fill="#C8102E" />
  </svg>
)

const FlagPE = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 60 40" aria-hidden="true" focusable="false">
    <rect width="20" height="40" fill="#D91023" />
    <rect x="20" width="20" height="40" fill="#ffffff" />
    <rect x="40" width="20" height="40" fill="#D91023" />
  </svg>
)

const FLAGS = {
  es: FlagES,
  en: FlagGB,
  qu: FlagPE,
}

const Flag = ({ code, className = "" }) => {
  const Component = FLAGS[code]
  if (!Component) return null
  return <Component className={className} />
}

export default Flag
