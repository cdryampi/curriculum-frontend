import { useState, useEffect } from "react";
import { CgArrowLongUp } from "react-icons/cg";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      setIsVisible(position > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollPercentage = () => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const percentage = Math.min((scrollPosition / maxScroll) * 100, 100);
    return `${percentage}%`;
  };

  return (
    <div>
      {isVisible && (
        <div
          className="fixed z-50 bottom-4 right-4 bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center text-xl cursor-pointer transition-opacity duration-300 hover:bg-accent"
          onClick={scrollToTop}
        >
          <CgArrowLongUp />
        </div>
      )}
      <div
        className="fixed top-0 left-0 h-1 bg-black transition-all duration-300 z-50"
        style={{ width: scrollPercentage() }}
      ></div>
    </div>
  );
};

export default ScrollToTopButton;
