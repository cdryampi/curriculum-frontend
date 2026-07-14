import { FaInfoCircle } from "react-icons/fa"
import { useTranslation } from "react-i18next"

const EmptyState = ({ title, description, icon, className = "" }) => {
  const { t } = useTranslation()
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center text-center py-10 px-4 ${className}`}
    >
      <div className="text-accent text-3xl mb-3" aria-hidden="true">
        {icon || <FaInfoCircle />}
      </div>
      <h3 className="text-white font-Poppins font-semibold text-[1.1rem] md:text-[1.25rem] mb-2">
        {title || t("common.emptyData")}
      </h3>
      {description && (
        <p className="text-desc2 font-NunitoSans text-[0.95rem] md:text-base max-w-md">
          {description}
        </p>
      )}
    </div>
  )
}

export default EmptyState
