import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { Fragment } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

function SmoothScroll({ children }) {
  const location = useLocation();
  const navType = useNavigationType();
  useEffect(() => {
    if (navType !== "POP") {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    }
  }, [location]);
  return <Fragment>{children}</Fragment>;
}
export default SmoothScroll;
