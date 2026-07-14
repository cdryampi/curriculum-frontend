import { useState } from "react";
import { useTranslation } from "react-i18next";
import { sendEmailService } from "../api";

const useSendEmail = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const sendEmailHandler = async (name, email, message) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await sendEmailService(name, email, message);
      setSuccess(response.data.mensaje || t("contact.sendSuccess"));
    } catch (err) {
      setError(err.response?.data?.error || t("contact.sendError"));
    } finally {
      setLoading(false);
    }
  };

  return { sendEmailHandler, loading, error, success };
};

export default useSendEmail;
