import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { FaHome } from "react-icons/fa"
import { Helmet } from "react-helmet-async"
import { BottomBar2 } from "../../components/BottomBar"
import { Header } from "../../components/Header"
import { Link } from "react-router-dom"
import useCurrentLanguage from "../../hooks/useCurrentLanguage"

const ErrorPage = () => {
  const { t } = useTranslation()
  const lang = useCurrentLanguage()
  useEffect(() => {
    document.title = t("seo.notFoundTitle")
  }, [t])

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{t("seo.notFoundTitle")}</title>
        <meta name="description" content={t("seo.notFoundDescription")} />
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header />
      <section className="featuredAreaWrap md:text-left text-center bg-dark z-[1] flex items-center bgGrident1 bg-blend-hard-light relative min-h-screen xl:rounded-br-[20rem] lg:rounded-br-[18rem] md:rounded-br-[15rem] sm:rounded-br-[10rem] rounded-br-0 w-screen md:py-[6.25rem] py-20">
        <div className="container mx-auto">
          <div className="errorPage text-center w-full">
            <div className="errorPageInner">
              <h2 className="text-[10rem] md:text-[15rem] font-Poppins font-bold text-accent leading-none">404</h2>
              <h3 className="text-desc text-2xl font-Poppins mb-8">{t("errorPage.title")}</h3>
              <Link className="text-accent hover:text-white font-Poppins text-lg font-bold inline-flex gap-2 items-center underline underline-offset-8" to={`/${lang}`} title={t("common.backHome")}>
                <FaHome /> {t("common.backHome")}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <BottomBar2 />
    </>
  )
}

export default ErrorPage
