import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { FaHome } from "react-icons/fa"
import { Helmet } from "react-helmet-async"
import { BottomBar2 } from "../../components/BottomBar"
import { Header } from "../../components/Header"
import { Link, useParams } from "react-router-dom"
import useFetchStaticPage from "../../hooks/useFetchStaticPage"
import usePDF from "../../hooks/UseGetPDFHook"
import { StaticPageSkeleton, BottomBarSkeleton } from "../../components/Skeleton"
import { ErrorState } from "../../components/ErrorState"
import SafeImage from "../../components/SafeImage/SafeImage"
import useCurrentLanguage from "../../hooks/useCurrentLanguage"

const StaticPage = () => {
  const { t } = useTranslation()
  const lang = useCurrentLanguage()
  const { slug } = useParams()
  const { data, loading, error, refetch } = useFetchStaticPage(slug)
  const { data: pdfData, loading: PDFloading } = usePDF()
  const pdf_link = pdfData?.resume_file

  useEffect(() => {
    document.title = data ? `${data?.title} - ${t("seo.siteTitle")}` : t("seo.loadingTitle")
  }, [data, t])

  if (error) {
    return (
      <>
        <Helmet><title>{t("seo.errorTitle")}</title></Helmet>
        <Header />
        <section className="featuredAreaWrap md:text-left text-center bg-dark z-[1] flex items-center bgGrident1 bg-blend-hard-light relative min-h-screen w-screen md:py-[6.25rem] py-20">
          <div className="container mx-auto">
            <ErrorState message={t("staticPage.error")} onRetry={refetch} />
          </div>
        </section>
        <BottomBar2 />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{data ? `${data?.title} - ${t("seo.siteTitle")}` : t("seo.loadingTitle")}</title>
        <meta name="description" content={data?.description || t("seo.staticDefaultDescription")} />
        <link rel="canonical" href={`https://cdryampi.github.io/curriculum-frontend/${lang}/static-page/${slug}/`} />
      </Helmet>

      {loading ? <StaticPageSkeleton /> : (
        <>
          <Header pdf={pdf_link} />
          <section className="featuredAreaWrap md:text-left text-center bg-dark z-[1] flex items-center bgGrident1 bg-blend-hard-light relative min-h-screen xl:rounded-br-[20rem] lg:rounded-br-[18rem] md:rounded-br-[15rem] sm:rounded-br-[10rem] rounded-br-0 w-screen md:py-[6.25rem] py-20">
            <div className="container mx-auto max-w-[73.125rem]">
              <div className="servDetailDesc flex flex-col gap-5 w-full section-fade-in">
                <header className="servDetailTop gap-[1.875rem] lg:flex items-end relative w-full mb-[3.125rem] sm:mb-[4rem] md:mb-[5.3125rem]">
                  <h1 className="text-white text-center mt-10 font-Poppins font-bold text-[1.325rem] md:text-[1.625rem]">{data?.title}</h1>
                </header>
                <article className="servDetailContent flex flex-col gap-[1.875rem] relative w-full mb-[3.125rem] sm:mb-[4rem] md:mb-[5.3125rem]">
                  <div className="servDetailText text-desc2 font-NunitoSans font-normal text-[1rem] md:text-[1.125rem] leading-relaxed self-center">
                    <div dangerouslySetInnerHTML={{ __html: data?.content }} />
                  </div>
                  {data?.image && (
                    <div className="servDetailImage relative rounded-[10px] sm:rounded-[1.25rem] md:rounded-[3.125rem] overflow-hidden w-full block">
                      <picture>
                        <source media="(max-width: 640px)" srcSet={data?.image?.image_for_mobile_url} />
                        <source media="(max-width: 1024px)" srcSet={data?.image?.image_for_tablet_url} />
                        <source media="(min-width: 1025px)" srcSet={data?.image?.image_for_pc_url} />
                        <SafeImage className="inline-block mb-5 w-full" src={data?.image.image_for_pc_url} alt={data?.title} loading="lazy" decoding="async" />
                      </picture>
                    </div>
                  )}
                </article>
                <footer className="servDetailFooter flex flex-col lg:flex-row items-center justify-between gap-[1.875rem] relative w-full mb-[3.125rem] sm:mb-[4rem] md:mb-[5.3125rem]">
                  <Link className="text-accent hover:text-accent2 font-Poppins text-[1rem] md:text-[1.0625rem] font-bold uppercase inline-flex gap-2 items-center underline underline-offset-8 mt-[1.875rem] md:mt-[2.8125rem]" to={`/${lang}`} title={t("common.backHome")}>
                    <FaHome /> {t("common.backHome")}
                  </Link>
                </footer>
              </div>
            </div>
          </section>
          <BottomBar2 />
        </>
      )}
    </>
  )
}

export default StaticPage
