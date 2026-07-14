import { Link } from "react-scroll"
import { useTranslation } from "react-i18next"
import PatternImg2 from "../../assets/images/patternImg2.jpg"
import { SectionTitle } from "../SectionTitles"
import useServicesList from "../../hooks/UseListServicesHook"
import { ServicesSkeleton } from "../Skeleton"
import { EmptyState } from "../EmptyState"
import { ErrorState } from "../ErrorState"
import SafeImage from "../SafeImage/SafeImage"

const Services = () => {
  const { t } = useTranslation()
  const { data: services, loading, error, refetch } = useServicesList()

  if (error) {
    return (
      <section className="servicesWrap pb-[4.5rem] md:pb-[5.5rem] lg:pb-[6.5rem] xl:pb-[7.5rem] relative w-full">
        <div className="container mx-auto">
          <ErrorState message={t("services.error")} onRetry={refetch} />
        </div>
      </section>
    )
  }

  if (loading) return <ServicesSkeleton />

  return (
    <section className="servicesWrap pb-[4.5rem] md:pb-[5.5rem] lg:pb-[6.5rem] xl:pb-[7.5rem] relative w-full" id="services">
      <div className="container sm:container md:container lg:container xl:max-w-[98.125rem] mx-auto">
        <SectionTitle title={t("services.title")} titleInner={t("services.titleInner")} subTitle={t("services.subtitle")} desc={t("services.desc")}></SectionTitle>
        {(!services || services.length === 0) ? (
          <EmptyState
            title={t("services.emptyTitle")}
            description={t("services.emptyDesc")}
          />
        ) : (
          <div className="servicesBoxes relative w-full section-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.875rem]">
              {services.map((item) => (
                <div key={`${item?.title}-${item?.id}`} className="gridItem group relative w-full min-h-[20rem] md:min-h-[24.375rem] p-6 md:p-7 lg:p-10 xl:p-[3.125rem] rounded-[10px] sm:rounded-xl md:rounded-[3.125rem] overflow-hidden flex flex-col items-center justify-center gap-4 text-center z-[1] transition-all duration-500 hover:scale-105 hover:shadow-lg">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:bg-accent group-hover:opacity-80 z-[-1]"
                    style={{ backgroundImage: `url(${PatternImg2})`, backgroundColor: item?.color, backgroundBlendMode: "multiply" }}
                  ></div>
                  <span className="inline-block w-20 h-20 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <SafeImage className="w-full h-full mx-auto" src={item?.icon?.file} alt={item?.title} loading="lazy" decoding="async" />
                  </span>
                  <h3 className="text-[1.3rem] lg:text-[1.325rem] xl:text-[1.5rem] font-semibold font-Poppins text-white min-h-[3rem] flex items-center justify-center transition-colors duration-300 group-hover:text-white cursor-pointer">
                    <Link to="contact" duration={500} offset={-100} title={item?.title}>{item?.title}</Link>
                  </h3>
                  <div className="text-base md:text-lg font-NunitoSans text-white min-h-[4rem] flex-grow flex items-center justify-center transition-opacity duration-300 group-hover:opacity-90" dangerouslySetInnerHTML={{ __html: item?.description }}></div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="viewAll text-center w-full mt-10 md:mt-[3.125rem] lg:mt-[4.0625rem]">
          <p className="text-desc2 font-NunitoSans text-[1rem] md:text-[1.125rem]">
            {t("services.viewAll")}{" "}
            <Link className="text-accent font-Poppins font-medium hover:text-accent2 underline underline-offset-8" to="contact" duration={500} offset={-100} title={t("services.contactTitle")}>{t("services.contact")}</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Services
