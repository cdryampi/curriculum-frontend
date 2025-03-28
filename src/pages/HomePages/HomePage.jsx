// HomePage.js
import React, { Fragment, useEffect } from "react";
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
import { GLOBAL_DELAY_CALLBACK } from "../../config";

const HomePage = () => {
  // Proporciona un valor para el `delay` en milisegundos
  const {
    data: userData,
    loading,
    error,
  } = useUserProfile(GLOBAL_DELAY_CALLBACK);
  const pdf_data = userData?.resume_file;
  const location = useLocation();
  useEffect(() => {
    if (!loading && location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });

          // Limpiar el hash de la URL sin recargar la página
          window.history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
          );
        }
      }, GLOBAL_DELAY_CALLBACK + 50);
    }
  }, [location, loading]);

  if (error) {
    return (
      <div className="pageLoader fixed justify-center items-center inset-0 flex">
        <div>Error al cargar el perfil del usuario.</div>
      </div>
    );
  }
  return (
    <div id="home">
      <title>Home - Curriculum Yampi</title>
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
