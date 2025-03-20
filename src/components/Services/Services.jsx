import { Link } from "react-router-dom";
import PatternImg2 from "../../assets/images/patternImg2.jpg";
import { SectionTitle } from "../SectionTitles";
import { ClipLoader } from "react-spinners";
import useServicesHook from "../../hooks/UseListServicesHook";

const Services = () => {
  const { data: services, loading, error } = useServicesHook();
  if (error) {
    return <div>Error al cargar.</div>;
  }
  return (
    <section className="servicesWrap pb-[4.5rem] md:pb-[5.5rem] lg:pb-[6.5rem] xl:pb-[7.5rem] relative w-full">
      <div className="container sm:container md:container lg:container xl:max-w-[98.125rem] mx-auto">
        <SectionTitle
          title="Mis servicios"
          titleInner="profesionales"
          subTitle="Que ofrezco"
          desc="Aquí puedes ver algunos de los servicios que ofrezco."
        ></SectionTitle>
        <div className="servicesBoxes relative w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.875rem]">
            {loading ? (
              <div className="grid grid-cols-1 w-full place-items-center justify-between gap-4">
                <ClipLoader size={60} color="#284be5" loading={true} />
              </div>
            ) : (
              services &&
              services.map((item) => (
                <div
                  key={item?.id}
                  className="gridItem group relative w-full min-h-[20rem] md:min-h-[24.375rem] p-6 md:p-7 lg:p-10 xl:p-[3.125rem] rounded-[10px] sm:rounded-xl md:rounded-[3.125rem] overflow-hidden flex flex-col items-center justify-center gap-4 text-center z-[1] transition-all duration-500 hover:scale-105 hover:shadow-lg"
                >
                  {/* Fondo con color dinámico y patrón */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:bg-accent group-hover:opacity-80 z-[-1]"
                    style={{
                      backgroundImage: `url(${PatternImg2})`,
                      backgroundColor: item?.color,
                      backgroundBlendMode: "multiply",
                    }}
                  ></div>

                  {/* Icono con efecto de hover */}
                  <span className="inline-block w-20 h-20 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <img
                      className="w-full h-full mx-auto"
                      src={item.icon.file}
                      alt={item.title}
                    />
                  </span>

                  {/* Título con animación de color */}
                  <h3 className="text-[1.3rem] lg:text-[1.325rem] xl:text-[1.5rem] font-semibold font-poppins text-white min-h-[3rem] flex items-center justify-center transition-colors duration-300 group-hover:text-black">
                    <Link to="#contact" title={item.title}>
                      {item.title}
                    </Link>
                  </h3>

                  {/* Descripción con animación de opacidad */}
                  <div
                    className="text-base md:text-lg font-nunito text-white min-h-[4rem] flex-grow flex items-center justify-center transition-opacity duration-300 group-hover:opacity-90"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></div>
                </div>
              ))
            )}
          </div>
          {/* Services Boxes */}
        </div>
        <div className="viewAll text-center w-full mt-10 md:mt-[3.125rem] lg:mt-[4.0625rem]">
          <p className="text-desc2 font-NunitoSans text-[1rem] md:text-[1.125rem]">
            Quieres ver todos mis servicos? .{" "}
            <Link
              className="text-accent font-Poppins font-medium hover:text-accent2 underline underline-offset-8"
              to="#contact"
              title="Haz clic para contactarme"
            >
              Contáctame
            </Link>
          </p>
          {/* View All */}
        </div>
      </div>
      {/* Services Wrap */}
    </section>
  );
};

export default Services;
