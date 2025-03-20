import { Link } from "react-router-dom";
import PatternImg from "../../assets/images/patternImg.jpg";
import RightDownIcon from "../../lib/icons/RightDown.svg?react";
import UseListPortfolioHook from "../../hooks/UseListPortfolioHook";
import { SectionTitle } from "../SectionTitles";
import { ClipLoader } from "react-spinners";

import { GIT_HUB_URL } from "../../config";

const Portfolio = () => {
  const { data: portfolio, loading, error } = UseListPortfolioHook();
  if (error) {
    return <div>Error loading portfolio details.</div>;
  }
  return (
    <section
      className="portWrap py-[4.5rem] md:py-[5.5rem] lg:py-[6.5rem] xl:py-[7.5rem relative w-full"
      id="portfolio"
    >
      <div
        className="fixedBg bg-left-top bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${PatternImg})` }}
      ></div>
      <div className="container sm:container md:container lg:container xl:container 2xl:container mx-auto">
        <SectionTitle
          title="Mis proyectos"
          titleInner="personales"
          desc="Aquí puedes ver algunos de los proyectos en los que he trabajado. Si quieres ver más, puedes visitar mi perfil de GitHub."
        ></SectionTitle>
        <div className="portList flex flex-wrap relative mx-[-.9375rem] mb-[-1.875rem]">
          {loading ? (
            <div className="grid grid-cols-1 w-full place-items-center gap-4">
              <ClipLoader size={60} color="#284be5" loading={true} />
            </div>
          ) : (
            portfolio &&
            portfolio.map((item, index) => (
              <div key={index} className="w-full md:w-[41.57%] px-2 mb-6">
                <div className="portBox group relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl xl:rounded-3xl w-full">
                  {/* Fondo con efecto hover */}
                  <div className="absolute inset-[10%] group-hover:inset-0 bg-accent opacity-0 group-hover:opacity-90 transition-all duration-500 ease-in-out z-[1]" />

                  {/* Imagen */}
                  <img
                    className="w-full max-h-[550px] object-contain transition-all duration-500 ease-in-out"
                    src={item.image.file}
                    alt={item.title}
                  />

                  {/* Información del proyecto */}
                  <div className="projInfo absolute left-0 top-3/4 group-hover:top-1/2 -translate-y-1/2 p-5 w-full text-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-in-out z-[2]">
                    <h3 className="text-white text-lg md:text-xl font-bold font-poppins">
                      <Link
                        to={item.link}
                        title={item.title}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <div
                      className="text-white font-nunito text-base md:text-lg mt-1"
                      dangerouslySetInnerHTML={{
                        __html: item?.description,
                      }}
                    ></div>

                    {/* Botón de enlace */}
                    <Link
                      className="inline-flex items-center justify-center border-2 sm:border-4 border-white/25 hover:border-white rounded-lg h-10 w-10 sm:h-14 sm:w-14 mt-5 transition-all duration-300 ease-in-out"
                      to={item.link}
                      title={item.title}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <RightDownIcon className="h-4 w-4 sm:h-5 sm:w-5 fill-white" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
          {/* Portfolio List */}
        </div>
        <div className="viewAll text-center w-full mt-10 md:mt-[3.125rem] lg:mt-[4.0625rem]">
          <p className="text-desc2 font-NunitoSans text-[1rem] md:text-[1.125rem]">
            Si quieres ver más sobre mis proyectos.{" "}
            <Link
              className="text-accent font-Poppins font-medium hover:text-accent2 underline underline-offset-8"
              to={GIT_HUB_URL}
              title="Haz click aquí para ver más"
              target="_blank"
              rel="noopener noreferrer"
            >
              Haz click aquí para ver más.
            </Link>
          </p>
          {/* View All */}
        </div>
      </div>
      {/* Portfolio Wrap */}
    </section>
  );
};

export default Portfolio;
