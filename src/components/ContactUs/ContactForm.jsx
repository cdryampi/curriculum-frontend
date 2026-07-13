import { useState, useEffect } from "react"
import useSendEmail from "../../hooks/UseEmailSenderHook"
import { toast } from "react-toastify"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_MESSAGE = 500

const ContactForm = () => {
  const { sendEmailHandler, loading, error, success } = useSendEmail()
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validate = (name, value) => {
    switch (name) {
      case "name":
        return value.trim().length < 2 ? "El nombre debe tener al menos 2 caracteres" : ""
      case "email":
        return !EMAIL_PATTERN.test(value) ? "Ingresa un email válido" : ""
      case "message":
        return value.trim().length < 10 ? "El mensaje debe tener al menos 10 caracteres" : ""
      default:
        return ""
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {
      name: validate("name", formData.name),
      email: validate("email", formData.email),
      message: validate("message", formData.message),
    }
    setErrors(newErrors)
    setTouched({ name: true, email: true, message: true })
    if (Object.values(newErrors).some(Boolean)) return
    await sendEmailHandler(formData.name, formData.email, formData.message)
  }

  useEffect(() => {
    if (success) {
      toast.success(success, { position: "top-right" })
      setFormData({ name: "", email: "", message: "" })
      setTouched({})
      setErrors({})
    }
    if (error) {
      toast.error(error, { position: "top-right" })
    }
  }, [success, error])

  const msgLength = formData.message.length

  return (
    <div className="contactFormWrap relative w-full">
      <form className="grid gap-[1.875rem] md:grid-cols-2 grid-cols-1" onSubmit={handleSubmit} noValidate>
        <div className="fieldBox w-full md:col-span-2">
          <label htmlFor="contact-message" className="text-white font-medium mb-[10px] block">
            Escribe tu mensaje
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={MAX_MESSAGE}
            className={`border-2 ${errors.message && touched.message ? "border-red-400" : "border-white/50 focus:border-white"} bg-black/20 rounded-[10px] w-full h-[8rem] p-[1.125rem] text-white transition-colors duration-200`}
            required
          />
          <div className="flex justify-between mt-1">
            {errors.message && touched.message ? (
              <span className="text-red-400 text-sm">{errors.message}</span>
            ) : <span />}
            <span className="text-desc2 text-xs">{msgLength}/{MAX_MESSAGE}</span>
          </div>
        </div>
        <div className="fieldBox w-full">
          <label htmlFor="contact-name" className="text-white font-medium mb-[10px] block">
            Tu nombre
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`border-2 ${errors.name && touched.name ? "border-red-400" : "border-white/50 focus:border-white"} bg-black/20 rounded-[10px] w-full h-[2.5rem] p-[10px] text-white transition-colors duration-200`}
            required
          />
          {errors.name && touched.name && <span className="text-red-400 text-sm mt-1 block">{errors.name}</span>}
        </div>
        <div className="fieldBox w-full">
          <label htmlFor="contact-email" className="text-white font-medium mb-[10px] block">
            Tu email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            pattern={EMAIL_PATTERN.source}
            className={`border-2 ${errors.email && touched.email ? "border-red-400" : "border-white/50 focus:border-white"} bg-black/20 rounded-[10px] w-full h-[2.5rem] p-[10px] text-white transition-colors duration-200`}
            required
          />
          {errors.email && touched.email && <span className="text-red-400 text-sm mt-1 block">{errors.email}</span>}
        </div>
        <div className="fieldbtn mt-[1.875rem] w-full md:col-span-2">
          <button
            className="bg-white text-accent font-bold uppercase rounded-[10px] px-7 py-[14px] hover:bg-accent2 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Contáctame"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
