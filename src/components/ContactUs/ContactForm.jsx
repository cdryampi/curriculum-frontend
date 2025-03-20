import { useState, useEffect } from "react";
import useSendEmail from "../../hooks/UseEmailSenderHook";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
  const { sendEmailHandler, loading, error, success } = useSendEmail();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendEmailHandler(formData.name, formData.email, formData.message);
  };

  // 🔥 Detecta cambios en `success` o `error` y muestra la alerta
  useEffect(() => {
    if (success) {
      toast.success(success, { position: "top-right" });
      setFormData({ name: "", email: "", message: "" }); // Limpia el formulario
    }
    if (error) {
      toast.error(error, { position: "top-right" });
    }
  }, [success, error]);

  return (
    <div className="contactFormWrap relative w-full">
      <form
        className="grid gap-[1.875rem] md:grid-cols-2 grid-cols-1"
        onSubmit={handleSubmit}
      >
        <div className="fieldBox w-full col-span-2">
          <label className="text-white font-medium mb-[10px] block">
            Escribe tu mensaje
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="border-2 border-white/50 focus:border-white bg-black/20 rounded-[10px] w-full h-[8rem] p-[1.125rem]"
            required
          ></textarea>
        </div>
        <div className="fieldBox w-full">
          <label className="text-white font-medium mb-[10px] block">
            Tu nombre
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border-2 border-white/50 focus:border-white bg-black/20 rounded-[10px] w-full h-[2.5rem] p-[10px]"
            required
          />
        </div>
        <div className="fieldBox w-full">
          <label className="text-white font-medium mb-[10px] block">
            Tu Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-white/50 focus:border-white bg-black/20 rounded-[10px] w-full h-[2.5rem] p-[10px]"
            required
          />
        </div>
        <div className="fieldbtn mt-[1.875rem] w-full col-span-2">
          <button
            className="bg-white text-accent font-bold uppercase rounded-[10px] px-7 py-[14px] hover:bg-accent2 hover:text-white"
            type="submit"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Contáctame"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
