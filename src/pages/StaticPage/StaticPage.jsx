import React, { Fragment } from "react";
import { FaHome } from "react-icons/fa";
import { BottomBar2 } from "../../components/BottomBar";
import { Header } from "../../components/Header";
import { Link, useParams } from "react-router-dom";
import useFetchStaticPage from "../../hooks/useFetchStaticPage";
import { GLOBAL_DELAY_CALLBACK } from "../../config";
import { SyncLoader } from "react-spinners";
import useGetPDFHook from "../../hooks/UseGetPDFHook";

const StaticPage = () => {
  const { slug } = useParams();
  const { data, loading, error } = useFetchStaticPage(
    slug,
    GLOBAL_DELAY_CALLBACK
  );
  const {
    data: pdfData,
    loading: PDFloading,
    error: PDFerror,
  } = useGetPDFHook();
  const pdf_link = pdfData?.resume_file;

  return (
    <Fragment>
      <title>
        {data
          ? `${data.title} - Curriculum de Yampi`
          : "Loading... - Curriculum de Yampi"}
      </title>
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
          <Header pdf={pdf_link} />
          <section className="featuredAreaWrap md:text-left text-center bg-dark z-[1] flex items-center bgGrident1 bg-blend-hard-light relative min-h-screen xl:rounded-br-[20rem] lg:rounded-br-[18rem] md:rounded-br-[15rem] sm:rounded-br-[10rem] rounded-br-0 w-screen md:py-[6.25rem] py-20">
            <div className="container sm:container md:container lg:container xl:max-w-[73.125rem] mx-auto">
              <div className="servDetailDesc flex flex-col gap-5 w-full">
                <header className="servDetailTop gap-[1.875rem] lg:flex items-end relative w-full mb-[3.125rem] sm:mb-[4rem] md:mb-[5.3125rem]">
                  <h1 className="text-accent2 text-center mt-10 font-Poppins font-bold text-[1.325rem] md:text-[1.625rem]">
                    {data?.title}
                  </h1>
                </header>
                <article className="servDetailContent flex flex-col gap-[1.875rem] relative w-full mb-[3.125rem] sm:mb-[4rem] md:mb-[5.3125rem]">
                  <div className="servDetailText text-desc2 font-NunitoSans font-normal text-[1rem] md:text-[1.125rem] leading-relaxed self-center">
                    <div dangerouslySetInnerHTML={{ __html: data?.content }} />
                  </div>
                  <div className="servDetailImage relative rounded-[10px] sm:rounded-[1.25rem] md:rounded-[3.125rem] overflow-hidden w-full block">
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
    </Fragment>
  );
};

export default StaticPage;
