import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../../components/Header";
import { FeaturedArea } from "../../components/FeaturedArea";
import { AboutUs } from "../../components/AboutUs";
import { BottomBar2 } from "../../components/BottomBar";
import { EducationAndSkills } from "../../components/EducationAndSkills";
import { MyWorkExperience } from "../../components/MyWorkExperience";
import { Portfolio } from "../../components/Portfolio";
import { Services } from "../../components/Services";
import { ContactUs } from "../../components/ContactUs";
import { ScrollToTopButton } from "../../components/BackToTopComponent";
import { SyncLoader } from "react-spinners";
import useUserProfile from "../../hooks/UseProfileUserHook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const { data: userData, loading, error, refetch } = useUserProfile();
  const pdf_data = userData?.resume_file;
  const location = useLocation();
  useEffect(() => {
    if (!loading && location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
    }
  }, [location, loading]);

  useEffect(() => {
    document.title = "Home - Curriculum Yampi";
  }, []);

  if (error) {
    return (
      <div className="pageLoader fixed flex-col justify-center items-center inset-0 flex bg-dark">
        <p className="text-white text-lg mb-4">Error al cargar el perfil del usuario.</p>
        <button
          className="bg-accent text-white px-6 py-2 rounded-lg font-Poppins font-bold hover:bg-accent2"
          onClick={refetch}
        >
          Reintentar
        </button>
      </div>
    );
  }
  return (
    <div id="home">
      {loading ? (
        <div className="pageLoader fixed justify-center items-center inset-0 flex">
          <SyncLoader
            color="#284be5"
            cssOverride={{}}
            loading
            margin={10}
            size={60}
            speedMultiplier={1}
          />
        </div>
      ) : (
        <>
          <Header pdf={pdf_data} />
          <FeaturedArea userData={userData} />
          <AboutUs userData={userData} />
          <Services />
          <Portfolio />
          <MyWorkExperience />
          <EducationAndSkills />
          <ToastContainer />
          <ContactUs />
          <BottomBar2 />
          <ScrollToTopButton />
        </>
      )}
    </div>
  );
};

export default HomePage;
