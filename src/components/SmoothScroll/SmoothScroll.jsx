import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { Fragment } from "react";
function SmoothScroll({ children }) {
  const location = useLocation();
  const navType = useNavigationType();
  useEffect(() => {
    if (navType !== "POP") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location]);
  return <Fragment>{children}</Fragment>;
}
export default SmoothScroll;
