import React from "react";
import { FaHome } from "react-icons/fa";
import { BottomBar2 } from "../../components/BottomBar";
import { Header } from "../../components/Header";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <React.Fragment>
      <title>Error Page - Curriculum de Yampi</title>

      <Header></Header>
      <section className="featuredAreaWrap md:text-left text-center bg-dark z-[1] flex items-center bgGrident1 bg-blend-hard-light relative min-h-screen xl:rounded-br-[20rem] lg:rounded-br-[18rem] md:rounded-br-[15rem] sm:rounded-br-[10rem] rounded-br-0 w-screen md:py-[6.25rem] py-20">
        <div className="container sm:container md:container lg:container xl:max-w-[73.125rem] mx-auto">
          <div className="errorPage text-center relative flex flex-col items-center justify-center w-full">
            <div className="errorPageInner">
              <h2 className="text-[10rem] sm:text-[13rem] md:text-[15rem] lg:text-[18.75rem] text-stroke-10 text-stroke-accent text-fill-transparent font-Poppins font-bold leading-none -mb-6">
                404
              </h2>
              <h3 className="text-[#647c9f] font-Poppins font-medium text-[1.875rem] md:text-[2.5rem]">
                página no encontrada :(
              </h3>
              <Link
                className="text-accent hover:text-accent2 font-Poppins text-[1rem] md:text-[1.0625rem] font-bold uppercase inline-flex gap-2 items-center underline underline-offset-7 mt-[1.875rem] md:mt-[2.8125rem]"
                to="/"
                title="Back to Home"
              >
                <FaHome></FaHome>Back to Home
              </Link>
            </div>
            {/* Error Page */}
          </div>
        </div>
        {/* Page Wrap */}
      </section>
      <BottomBar2></BottomBar2>
    </React.Fragment>
  );
};

export default ErrorPage;
