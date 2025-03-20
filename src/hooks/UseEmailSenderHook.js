import { useState } from "react";
import { sendEmailService } from "../api";

const useSendEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const sendEmailHandler = async (name, email, message) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await sendEmailService(name, email, message);
      setSuccess(response.data.mensaje);
    } catch (err) {
      setError(err.response?.data?.error || "Error al enviar el correo");
    } finally {
      setLoading(false);
    }
  };

  return { sendEmailHandler, loading, error, success };
};

export default useSendEmail;
