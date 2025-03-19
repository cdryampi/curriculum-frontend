// HomePage.js
import React, { Fragment } from "react";
import { Header } from "../../components/Header";
import { FeaturedArea } from "../../components/FeaturedArea";
import { AboutUs } from "../../components/AboutUs";
import { BottomBar2 } from "../../components/BottomBar";
import { EducationAndSkills } from "../../components/EducationAndSkills";
import { MyWorkExperience } from "../../components/MyWorkExperience";
import { Portfolio } from "../../components/Portfolio";
import { SyncLoader } from "react-spinners";
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
          <Header />
          <FeaturedArea userData={userData} />
          <AboutUs userData={userData} />
          <Portfolio />
          <MyWorkExperience />
          <EducationAndSkills />
          <BottomBar2 />
        </>
      )}
    </Fragment>
  );
};

export default HomePage;
