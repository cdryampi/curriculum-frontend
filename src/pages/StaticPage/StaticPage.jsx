import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { FaHome } from "react-icons/fa";
import { BottomBar2 } from "../../components/BottomBar";
import { Header } from "../../components/Header";
import { Link, useParams } from "react-router-dom";
import useFetchStaticPage from "../../hooks/useFetchStaticPage";
import { GLOBAL_DELAY_CALLBACK } from "../../config";
import { PushSpinner } from "react-spinners-kit";

const StaticPage = () => {
  const { slug } = useParams();
  const { data, loading, error } = useFetchStaticPage(
    slug,
    GLOBAL_DELAY_CALLBACK
  );

  return (
    <React.Fragment>
      <HelmetProvider>
        <title>
          {data
            ? `${data.title} - Curriculum de Yampi`
            : "Loading... - Curriculum de Yampi"}
        </title>
      </HelmetProvider>
      {loading ? (
        <div className="pageLoader fixed justify-center items-center inset-0 flex">
          <PushSpinner size={60} color="#284be5" loading={true} />
        </div>
      ) : (
        <>
          <Header />
          <section className="pageWrap py-[5rem] md:py-[5.5rem] lg:py-[6.875rem] relative w-full">
            <div className="container sm:container md:container lg:container xl:max-w-[73.125rem] mx-auto">
              <div className="servDetailDesc flex flex-col gap-5 w-full">
                <header className="servDetailTop gap-[1.875rem] lg:flex items-end relative w-full mb-[3.125rem] sm:mb-[4rem] md:mb-[5.3125rem]">
                  <h2 className="text-accent2 font-Poppins font-bold text-[1.325rem] md:text-[1.625rem]">
                    {data?.title}
                  </h2>
                </header>
                <article className="servDetailContent flex flex-col lg:flex-row gap-[1.875rem] relative w-full mb-[3.125rem] sm:mb-[4rem] md:mb-[5.3125rem]">
                  <div className="servDetailText text-desc2 font-NunitoSans font-normal text-[1rem] md:text-[1.125rem] leading-relaxed self-center">
                    <p dangerouslySetInnerHTML={{ __html: data?.content }} />
                  </div>
                  <div className="servDetailImage relative rounded-[10px] sm:rounded-[1.25rem] md:rounded-[3.125rem] overflow-hidden w-full">
                    {data?.image && (
                      <picture>
                        <source
                          media="(max-width: 640px)"
                          srcSet={data.image.image_for_mobile_url}
                        />
                        <source
                          media="(max-width: 1024px)"
                          srcSet={data.image.image_for_tablet_url}
                        />
                        <source
                          media="(min-width: 1025px)"
                          srcSet={data.image.image_for_pc_url}
                        />
                        <img
                          className="inline-block mb-5 w-full"
                          src={data.image.image_for_pc_url}
                          alt={data.title}
                        />
                      </picture>
                    )}
                  </div>
                </article>
                <footer className="servDetailFooter flex flex-col lg:flex-row items-center justify-between gap-[1.875rem] relative w-full mb-[3.125rem] sm:mb-[4rem] md:mb-[5.3125rem]">
                  <Link
                    className="text-accent hover:text-accent2 font-Poppins text-[1rem] md:text-[1.0625rem] font-bold uppercase inline-flex gap-2 items-center underline underline-offset-7 mt-[1.875rem] md:mt-[2.8125rem]"
                    to="/"
                    title="Back to Home"
                  >
                    <FaHome />
                    Back to Home
                  </Link>
                </footer>
              </div>
            </div>
            {/* Page Wrap */}
          </section>
          <BottomBar2 />
        </>
      )}
    </React.Fragment>
  );
};

export default StaticPage;
