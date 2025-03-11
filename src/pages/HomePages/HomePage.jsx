// HomePage.js
import React, { Fragment } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Header } from "../../components/Header";
import { FeaturedArea } from "../../components/FeaturedArea";
import { AboutUs } from "../../components/AboutUs";
import { BottomBar2 } from "../../components/BottomBar";
import { EducationAndSkills } from "../../components/EducationAndSkills";
import { MyWorkExperience } from "../../components/MyWorkExperience";
import { PushSpinner } from "react-spinners-kit";
import useUserProfile from "../../hooks/UseProfileUserHook";
import { GLOBAL_DELAY_CALLBACK } from "../../config";

const HomePage = () => {
  // Proporciona un valor para el `delay` en milisegundos
  const {
    data: userData,
    loading,
    error,
  } = useUserProfile(GLOBAL_DELAY_CALLBACK);

  if (error) {
    return (
      <div className="pageLoader fixed justify-center items-center inset-0 flex">
        <div>Error al cargar el perfil del usuario.</div>
      </div>
    );
  }
  return (
    <Fragment>
      <HelmetProvider>
        <title>Home - Curriculum Yampi</title>
      </HelmetProvider>
      {loading ? (
        <div className="pageLoader fixed justify-center items-center inset-0 flex">
          <PushSpinner size={60} color="#284be5" loading={true} />
        </div>
      ) : (
        <>
          <Header />
          <FeaturedArea userData={userData} />
          <AboutUs userData={userData} />
          <MyWorkExperience />
          <EducationAndSkills />
          <BottomBar2 />
        </>
      )}
    </Fragment>
  );
};

export default HomePage;
