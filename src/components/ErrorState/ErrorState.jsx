import { FaExclamationTriangle } from "react-icons/fa"

const ErrorState = ({ message = "Algo salió mal al cargar los datos.", onRetry, retryLabel = "Reintentar", className = "" }) => {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center text-center py-8 px-4 ${className}`}
    >
      <div className="text-red-400 text-3xl mb-3" aria-hidden="true">
        <FaExclamationTriangle />
      </div>
      <p className="text-red-400 mb-4 font-NunitoSans text-[0.95rem] md:text-base max-w-md">
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="bg-accent text-white px-5 py-2 rounded font-bold hover:bg-accent2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {retryLabel}
        </button>
      )}
    </div>
  )
}

export default ErrorState
